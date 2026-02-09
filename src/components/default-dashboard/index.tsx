import { useEffect, useState } from "react";
import OnboardingActions, { OnboardingStatus } from "@/service/onboarding/actions";
import * as styles from "./styles";

const DefaultDashboard = () => {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await OnboardingActions.getStatus();
        setStatus(data);
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className={styles.DashboardLayout}>
        <main className={styles.MainContent}>
          <div className={styles.WelcomeContent}>
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  const currentStep = status?.currentStep || 1;
  const step1Complete = status?.step1Complete || false;
  const step2Complete = status?.step2Complete || false;
  const step3Complete = status?.step3Complete || false;

  // If onboarding is complete (step 4), show dashboard instead
  if (currentStep === 4 || step3Complete) {
    return (
      <div className={styles.DashboardLayout}>
        <main className={styles.MainContent}>
          <div className={styles.WelcomeContent}>
            <div className={styles.WelcomeHero}>
              <div className={styles.WelcomeIcon}>✅</div>
              <h1 className={styles.WelcomeTitle}>Dashboard</h1>
              <p className={styles.WelcomeSubtitle}>
                Onboarding complete! Your carbon management dashboard is ready.
              </p>
            </div>
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <div style={{ background: '#f0fdf4', padding: '40px', borderRadius: '12px', marginBottom: '20px' }}>
                <h2 style={{ color: '#059669', marginBottom: '16px' }}>🎉 Congratulations!</h2>
                <p style={{ fontSize: '16px', color: '#064e3b' }}>
                  You've completed all onboarding steps. Access your data and reports using the navigation menu.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
                <a href="/company-profile" style={{ padding: '24px', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏢</div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Company Profile</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>{status?.companyProfile.facilitiesCount || 0} facilities</div>
                </a>
                <a href="/data-collection" style={{ padding: '24px', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Data Collection</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>{status?.dataCollection.totalEntries || 0} entries</div>
                </a>
                <a href="/reports" style={{ padding: '24px', background: 'white', border: '2px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', color: '#1e293b', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📄</div>
                  <div style={{ fontWeight: 600, marginBottom: '8px' }}>Reports</div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>{status?.reports.reportCount || 0} reports</div>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.DashboardLayout}>
      <main className={styles.MainContent}>
        <div className={styles.WelcomeContent}>
          <div className={styles.WelcomeHero}>
            <div className={styles.WelcomeIcon}>🌍</div>
            <h1 className={styles.WelcomeTitle}>Welcome to EmTerra!</h1>
            <p className={styles.WelcomeSubtitle}>
              Your journey to carbon transparency starts here — Easy as 1, 2, 3!
            </p>
            <p className={styles.WelcomeDescription}>
              Get started by completing your company profile, then begin
              collecting your data, and finally generate insightful reports.
              We're here to guide you every step of the way!
            </p>
          </div>
          <div className={styles.StepsContainer}>
            <div className={`${styles.StepCard} ${currentStep === 1 ? styles.StepActive : step1Complete ? styles.StepComplete : ''}`}>
              <div className={styles.StepNumber}>{step1Complete ? '✓' : '1'}</div>
              <div className={styles.StepTitle}>Complete Company Profile</div>
              <div className={styles.StepDescription}>
                Add your company details and facilities to unlock data
                collection features.
                {status && status.companyProfile.facilitiesCount > 0 && (
                  <div style={{ marginTop: '8px', color: '#059669', fontWeight: 600 }}>
                    ✓ {status.companyProfile.facilitiesCount} {status.companyProfile.facilitiesCount === 1 ? 'facility' : 'facilities'} added
                  </div>
                )}
              </div>
              <a href="/company-profile" className={styles.StepAction}>
                {step1Complete ? 'Manage Profile' : 'Go to Company Profile'}
              </a>
            </div>
            <div className={`${styles.StepCard} ${currentStep === 2 ? styles.StepActive : step2Complete ? styles.StepComplete : ''}`}>
              <div className={styles.StepNumber}>{step2Complete ? '✓' : '2'}</div>
              <div className={styles.StepTitle}>Start Data Collection</div>
              <div className={styles.StepDescription}>
                Input your activity and spend data to track your carbon
                footprint.
                {status && status.dataCollection.totalEntries > 0 && (
                  <div style={{ marginTop: '8px', color: '#059669', fontWeight: 600 }}>
                    ✓ {status.dataCollection.totalEntries} {status.dataCollection.totalEntries === 1 ? 'entry' : 'entries'} added
                  </div>
                )}
              </div>
              <a
                href={step1Complete ? "/data-collection" : "#"}
                className={`${styles.StepAction} ${!step1Complete ? styles.Disabled : ''}`}
              >
                {step2Complete ? 'Continue Collection' : 'Start Data Collection'}
              </a>
            </div>
            <div className={`${styles.StepCard} ${currentStep === 3 ? styles.StepActive : ''}`}>
              <div className={styles.StepNumber}>3</div>
              <div className={styles.StepTitle}>Generate Reports</div>
              <div className={styles.StepDescription}>
                View and download reports to share your progress and insights.
                {status && status.reports.reportCount > 0 && (
                  <div style={{ marginTop: '8px', color: '#059669', fontWeight: 600 }}>
                    ✓ {status.reports.reportCount} {status.reports.reportCount === 1 ? 'report' : 'reports'} generated
                  </div>
                )}
              </div>
              <a
                href={step2Complete ? "/reports" : "#"}
                className={`${styles.StepAction} ${!step2Complete ? styles.Disabled : ''}`}
              >
                View Reports
              </a>
            </div>
          </div>
          <div className={styles.InfoBanner}>
            <div className={styles.InfoBannerContent}>
              <div className={styles.InfoBannerIcon}>💡</div>
              <div>
                <div className={styles.InfoBannerTitle}>Tip</div>
                <div className={styles.InfoBannerText}>
                  You can invite team members to help manage your company’s data
                  and progress.
                </div>
              </div>
            </div>
          </div>
          <div className={styles.HelpSection}>
            <div className={styles.HelpIcon}>🤝</div>
            <h3 className={styles.HelpTitle}>Need Help Getting Started?</h3>
            <div className={styles.HelpDescription}>
              Check out our documentation or contact support for assistance.
            </div>
            <div className={styles.HelpContact}>
              <a href="#" className={styles.HelpButton}>
                Documentation
              </a>
              <a href="#" className={styles.HelpButton}>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DefaultDashboard;

