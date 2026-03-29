import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FirebaseAdminService } from './firebase-admin.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private firebaseAdmin: FirebaseAdminService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        fullName: registerDto.fullName,
        phone: registerDto.phone,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        kycStatus: true,
        role: true,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    // omit password
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async firebaseLogin(idToken: string) {
    // 1. Verify the token with Firebase Admin SDK
    const decoded = await this.firebaseAdmin.verifyIdToken(idToken);

    const firebaseUid = decoded.uid;
    const email = decoded.email;

    if (!email) {
      throw new UnauthorizedException('Firebase token does not contain an email address');
    }

    // 2. Upsert the user — create if new, otherwise return existing record
    const user = await this.prisma.user.upsert({
      where: { email },
      update: {}, // No forced overwrites on login
      create: {
        email,
        fullName: decoded.name || decoded.email?.split('@')[0] || 'PropChain User',
        password: await bcrypt.hash(firebaseUid, 10), // Non-usable placeholder password
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        kycStatus: true,
        role: true,
      },
    });

    // 3. Issue PropChain JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
