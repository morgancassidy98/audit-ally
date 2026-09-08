import { signIn } from '@/lib/auth';
import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { CredentialsForm } from '@/components/CredentialsForm';
import styles from './page.module.css';

function Divider({ children }: { children: React.ReactNode }) {
  return <div className={`text-muted ${styles.divider}`}>{children}</div>;
}

export default function LoginPage() {
  return (
    <div className={styles.shell}>
      <div className={`card ${styles.card}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Audit Ally</h1>
          <p className={`text-muted ${styles.subtitle}`}>
            Sign in to manage your accessibility audits
          </p>
        </div>

        <div className={styles.stack}>
          <div className={styles.group}>
            <form action={async () => {
              'use server';
              await signIn('demo', { redirectTo: '/' });
            }}>
              <button className={`btn btn-primary w-full ${styles.providerButton}`} type="submit">
                Explore the Demo
              </button>
            </form>
            <p className={`text-muted ${styles.hint}`}>
              Reviewing this app? Jump straight into a pre-filled sample audit — no account needed.
            </p>
          </div>

          <Divider>or continue with email</Divider>

          <CredentialsForm />

          <Divider>or</Divider>

          <div className={styles.group}>
            <form action={async () => {
              'use server';
              await signIn('github', { redirectTo: '/' });
            }}>
              <button className={`btn btn-outline w-full ${styles.providerButton}`} type="submit">
                <GitHubIcon size={24} />
                Continue with GitHub
              </button>
            </form>

            <form action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/' });
            }}>
              <button className={`btn btn-outline w-full ${styles.providerButton}`} type="submit">
                <GoogleIcon size={24} />
                Continue with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}