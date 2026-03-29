import { Injectable, OnModuleInit, Logger, UnauthorizedException } from '@nestjs/common';
import type { App } from 'firebase-admin/app';
import type { DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseAdminService.name);
  private app: App | null = null;

  async onModuleInit() {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
      this.logger.warn(
        'Firebase Admin SDK credentials not set — firebase-login endpoint will be unavailable.',
      );
      return;
    }

    const { initializeApp, getApps, cert } = await import('firebase-admin/app');

    // Avoid double-initialisation (e.g. hot-reload in dev)
    const existing = getApps().find((a) => a.name === 'propchain-admin');
    if (existing) {
      this.app = existing;
      return;
    }

    this.app = initializeApp(
      {
        credential: cert({
          projectId,
          clientEmail,
          // Cloud Run / Secret Manager stores newlines as literal \n
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      },
      'propchain-admin',
    );

    this.logger.log('Firebase Admin SDK initialised.');
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    if (!this.app) {
      throw new UnauthorizedException('Firebase Admin SDK not initialised');
    }
    const { getAuth } = await import('firebase-admin/auth');
    try {
      return await getAuth(this.app).verifyIdToken(idToken, true /* checkRevoked */);
    } catch {
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }
}
