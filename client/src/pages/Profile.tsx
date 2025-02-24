import SettingsSection from "../components/SettingSection/SettingsSection";
import Activities from "../components/Statistics/Activities";
import Statistics from "../components/Statistics/Statistics";
import "../styles/ProfilePage.scss"


const Profile = () => {
   return (
      <div className="profile">
         <SettingsSection />
         <Statistics />
         <Activities />
      </div>
   )
}

export default Profile;