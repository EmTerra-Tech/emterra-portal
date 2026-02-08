import * as styles from "./styles";

const DefaultDashboard = () => {
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
              We’re here to guide you every step of the way!
            </p>
          </div>
          <div className={styles.StepsContainer}>
            <div className={`${styles.StepCard} ${styles.StepActive}`}>
              <div className={styles.StepNumber}>1</div>
              <div className={styles.StepTitle}>Complete Company Profile</div>
              <div className={styles.StepDescription}>
                Add your company details and facilities to unlock data
                collection features.
              </div>
              <a href="/company-profile" className={styles.StepAction}>
                Go to Company Profile
              </a>
            </div>
            <div className={styles.StepCard}>
              <div className={styles.StepNumber}>2</div>
              <div className={styles.StepTitle}>Start Data Collection</div>
              <div className={styles.StepDescription}>
                Input your activity and spend data to track your carbon
                footprint.
              </div>
              <a href="#" className={`${styles.StepAction} ${styles.Disabled}`}>
                Start Data Collection
              </a>
            </div>
            <div className={styles.StepCard}>
              <div className={styles.StepNumber}>3</div>
              <div className={styles.StepTitle}>Generate Reports</div>
              <div className={styles.StepDescription}>
                View and download reports to share your progress and insights.
              </div>
              <a href="#" className={`${styles.StepAction} ${styles.Disabled}`}>
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

