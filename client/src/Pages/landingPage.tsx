import ResponsiveNavbar from "../components/landingPageComponents/navbar/navbar"
import Landing from "../components/landingPageComponents/landing/landing"
import ResponsiveFooter from "../components/landingPageComponents/footer/footer"
export default function LandingPage(){
   return(
      <>
      <div>
         <ResponsiveNavbar/>
         <Landing/>
         <ResponsiveFooter/>
      </div>
      </>
   )
}