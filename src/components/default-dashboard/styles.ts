
import { css } from "@emotion/css";

export const DashboardLayout = css`
	display: flex;
	height: 100vh;
`;

export const Sidebar = css`
	width: 250px;
	background: #1e293b;
	color: white;
	padding: 20px 0;
	overflow-y: auto;
`;

export const SidebarLogo = css`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 0 20px;
	margin-bottom: 30px;
`;

export const SidebarLogoIcon = css`
	width: 32px;
	height: 32px;
	background: linear-gradient(135deg, #2dd4bf, #059669);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	font-size: 14px;
`;

export const SidebarLogoText = css`
	font-weight: 600;
	font-size: 16px;
`;

export const NavSection = css`
	margin-bottom: 25px;
`;

export const NavTitle = css`
	padding: 0 20px;
	font-size: 11px;
	font-weight: 600;
	color: #94a3b8;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 10px;
`;

export const NavItem = css`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 10px 20px;
	color: #cbd5e1;
	text-decoration: none;
	transition: all 0.2s ease;
	border-left: 3px solid transparent;
	position: relative;
	cursor: pointer;
`;

export const NavIcon = css`
	width: 20px;
	height: 20px;
	background: currentColor;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	opacity: 0.8;
`;


export const Active = css`
	background: rgba(45, 212, 191, 0.15);
	color: #2dd4bf;
	border-left-color: #2dd4bf;
`;

export const Disabled = css`
	opacity: 0.5;
	cursor: not-allowed;
`;

export const NextStep = css``;
export const StepTwo = css``;
export const StepThree = css``;

export const MainContent = css`
	flex: 1;
	background: #f8fafc;
	overflow-y: auto;
`;

export const TopBar = css`
	background: white;
	padding: 16px 24px;
	border-bottom: 1px solid #e2e8f0;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Breadcrumb = css`
	color: #64748b;
	font-size: 14px;
`;

export const UserMenu = css`
	display: flex;
	align-items: center;
	gap: 12px;
`;

export const NotificationIcon = css`
	width: 32px;
	height: 32px;
	background: #f1f5f9;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #64748b;
	cursor: pointer;
	position: relative;
`;

export const UserAvatar = css`
	width: 32px;
	height: 32px;
	background: linear-gradient(135deg, #2dd4bf, #059669);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
	font-size: 14px;
`;

export const WelcomeContent = css`
	padding: 40px 60px;
	max-width: 1400px;
	margin: 0 auto;
`;

export const WelcomeHero = css`
	text-align: center;
	margin-bottom: 48px;
`;

export const WelcomeIcon = css`
	width: 80px;
	height: 80px;
	background: linear-gradient(135deg, #2dd4bf, #059669);
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 36px;
	margin: 0 auto 24px;
	box-shadow: 0 8px 32px rgba(45, 212, 191, 0.3);
`;

export const WelcomeTitle = css`
	font-size: 32px;
	font-weight: 800;
	color: #1e293b;
	margin-bottom: 16px;
	background: linear-gradient(135deg, #2dd4bf, #059669);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

export const WelcomeSubtitle = css`
	font-size: 18px;
	color: #64748b;
	margin-bottom: 16px;
`;

export const WelcomeDescription = css`
	font-size: 16px;
	color: #64748b;
	line-height: 1.7;
`;

export const StepsContainer = css`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 32px;
	margin-bottom: 40px;
	max-width: 1600px;
	margin-left: auto;
	margin-right: auto;
`;

export const StepCard = css`
	background: white;
	border-radius: 16px;
	padding: 40px;
	box-shadow: 0 4px 16px rgba(0,0,0,0.08);
	border: 2px solid transparent;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
`;

export const StepActive = css`
	border-color: #2dd4bf;
	transform: translateY(-4px);
	box-shadow: 0 8px 32px rgba(45, 212, 191, 0.2);
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(90deg, #2dd4bf, #059669);
	}
`;

export const StepNumber = css`
	width: 40px;
	height: 40px;
	background: #e2e8f0;
	color: #64748b;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	font-weight: 700;
	margin-bottom: 20px;
`;

export const StepTitle = css`
	font-size: 20px;
	font-weight: 700;
	color: #1e293b;
	margin-bottom: 12px;
`;

export const StepDescription = css`
	color: #64748b;
	margin-bottom: 20px;
	line-height: 1.6;
`;

export const StepAction = css`
	padding: 12px 24px;
	background: linear-gradient(135deg, #2dd4bf, #059669);
	color: white;
	border: none;
	border-radius: 8px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.2s ease;
	text-decoration: none;
	display: inline-block;
	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(45, 212, 191, 0.3);
	}
`;

export const InfoBanner = css`
	background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
	border: 1px solid #0ea5e9;
	border-radius: 16px;
	padding: 24px;
	margin-bottom: 32px;
`;

export const InfoBannerContent = css`
	display: flex;
	align-items: start;
	gap: 16px;
`;

export const InfoBannerIcon = css`
	font-size: 28px;
	margin-right: 8px;
`;

export const InfoBannerTitle = css`
	font-weight: 700;
	color: #0ea5e9;
	margin-bottom: 2px;
`;

export const InfoBannerText = css`
	color: #334155;
`;

export const HelpSection = css`
	background: white;
	border-radius: 16px;
	padding: 32px;
	box-shadow: 0 4px 16px rgba(0,0,0,0.08);
	text-align: center;
`;

export const HelpIcon = css`
	width: 60px;
	height: 60px;
	background: #fef3c7;
	color: #f59e0b;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	margin: 0 auto 20px;
`;

export const HelpTitle = css`
	font-size: 18px;
	font-weight: 600;
	color: #1e293b;
	margin-bottom: 12px;
`;

export const HelpDescription = css`
	color: #64748b;
	margin-bottom: 20px;
`;

export const HelpContact = css`
	display: flex;
	gap: 16px;
	justify-content: center;
`;

export const HelpButton = css`
	padding: 8px 16px;
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	color: #374151;
	text-decoration: none;
	font-size: 14px;
	font-weight: 500;
	transition: all 0.2s ease;
	&:hover {
		background: #f1f5f9;
		border-color: #2dd4bf;
	}
`;
