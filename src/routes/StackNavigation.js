import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../screens/Auth/LoginScreen";
import HomeScreen from "../screens/Dashboard/HomeScreen";
import OtpScreen from "../screens/Auth/OtpScreen";
import { DrawerNavigation } from "./BottomNavigation";
import InsuranceListScreen from "../screens/InsuranceProcess/InsuranceListScreen";
import { CustomBackButton } from "../components/CustomFields";
import CarRegistrationNumberScreen from "../screens/InsuranceProcess/CarInsurance/CarRegistrationNumberScreen";
import QuotationSummaryScreen from "../screens/InsuranceProcess/CarInsurance/QuotationSummaryScreen";
import PremiumBreakupScreen from "../screens/InsuranceProcess/CarInsurance/PremiumBreakupScreen";
import LoginOptionsScreen from "../screens/Auth/LoginOptionsScreen";
import { colors } from "../styles/colors";
import SelectBrandScreen from "../screens/InsuranceProcess/CarInsurance/SelectBrandScreen";
import SelectModalScreen from "../screens/InsuranceProcess/CarInsurance/SelectModalScreen";
import SelectVariantScreen from "../screens/InsuranceProcess/CarInsurance/SelectVariantScreen";
import SelectRegistrationYearScreen from "../screens/InsuranceProcess/CarInsurance/SelectRegistrationYearScreen";
import PreviousPolicyStatusScreen from "../screens/InsuranceProcess/CarInsurance/PreviousPolicyStatusScreen";
import HealthInsuranceForScreen from "../screens/InsuranceProcess/HealthInsurance/HealthInsuranceForScreen";
import PersonalFamilyFormScreen from "../screens/InsuranceProcess/HealthInsurance/PersonalFamilyFormScreen";
import LocationFormScreen from "../screens/InsuranceProcess/HealthInsurance/LocationFormScreen";
import HealthQuotationsScreen from "../screens/InsuranceProcess/HealthInsurance/HealthQuotationsScreen";
import PersonalDetailsFormScreen from "../screens/InsuranceProcess/common/PersonalDetailsFormScreen";
import VehiclePolicyFormScreen from "../screens/InsuranceProcess/CarInsurance/VehiclePolicyFormScreen";
import TwoWheelerRegNumberScreen from "../screens/InsuranceProcess/TwoWheeler/TwoWheelerRegNumberScreen";
import TwoWheelerPolicyFormScreen from "../screens/InsuranceProcess/TwoWheeler/TwoWheelerPolicyFormScreen";
import NotificationScreen from "../screens/other/NotificationScreen";
import { HomeHeader } from "../components/home/HomeComponents";
import ClaimFormScreen from "../screens/Claim/ClaimFormScreen";
import TransactionsScreen from "../screens/other/TransactionsScreen";
import EditVehicleDetails from "../screens/InsuranceProcess/CarInsurance/EditVehicleDetails";
import AboutUsScreen from "../screens/other/AboutUs";
import EditProfileScreen from "../screens/other/EditProfileScreen";
import AllocatedMentorScreen from "../screens/other/AllocatedMentorScreen";
import ReferScreen from "../screens/other/ReferScreen";
import ClaimDetailsScreen from "../screens/Claim/ClaimDetailsScreen";
import WebviewQuatationScreen from "../screens/other/WebviewQuatationScreen";
import MedicalHistoryScreen from "../screens/InsuranceProcess/HealthInsurance/MedicalHistoryScreen";


const Stack = createStackNavigator();
export const cardStyle = { cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }
export const hideHeader = { headerShown: false };


export const AuthNavigation = () => (
  <Stack.Navigator screenOptions={{ ...cardStyle, ...hideHeader }}>
    <Stack.Screen component={LoginOptionsScreen} name="loginOptions" />
    <Stack.Screen component={LoginScreen} name="login" />
    <Stack.Screen component={OtpScreen} name="otpScreen" />
  </Stack.Navigator>
)


export const StackNavigation = () => (
  <Stack.Navigator screenOptions={{
    ...cardStyle,
    headerLeft: () => <CustomBackButton style={{ marginLeft: 20 }} />,
    headerStyle: { backgroundColor: colors.primary },
    headerTintColor: colors.white,
    headerTitleAlign: "left"
  }}>
    <Stack.Screen name="tab" component={DrawerNavigation} options={{ ...hideHeader }} />
    <Stack.Screen name="insuranceList" component={InsuranceListScreen} options={{ headerTitle: "" }} />
    <Stack.Screen name="editVehicleDetails" component={EditVehicleDetails} options={{ headerTitle: "Edit Details" }} />
    <Stack.Screen name="carRegistration" component={CarRegistrationNumberScreen} options={{ headerTitle: "Car Insurance" }} />
    <Stack.Screen name="carBrandList" component={SelectBrandScreen} options={{ headerTitle: "Select Vehicle Brand" }} />
    <Stack.Screen name="carModalScreen" component={SelectModalScreen} options={{ headerTitle: "Select Vehicle Model" }} />
    <Stack.Screen name="carVariantScreen" component={SelectVariantScreen} options={{ headerTitle: "Select Vehicle Variant" }} />
    <Stack.Screen name="registrationYear" component={SelectRegistrationYearScreen} options={{ headerTitle: "Select a Registration Year" }} />
    <Stack.Screen name="previousPolicy" component={PreviousPolicyStatusScreen} options={{ headerTitle: "Previous Policy Status" }} />
    <Stack.Screen name="quotationSummary" component={QuotationSummaryScreen} options={{

    }} />
    <Stack.Screen name="premiumBreakup" component={PremiumBreakupScreen} options={{ headerTitle: "Premium Breakup" }} />
    <Stack.Screen name="healthInsuranceFor" component={HealthInsuranceForScreen} options={{ headerTitle: "Health Insurance" }} />
    <Stack.Screen name="personalAndFamilyForm" component={PersonalFamilyFormScreen} options={{ headerTitle: "Health Insurance" }} />
    <Stack.Screen name="locationSelect" component={LocationFormScreen} options={{ headerTitle: "Health Insurance" }} />
    <Stack.Screen name="healthQuotations" component={HealthQuotationsScreen} options={{ headerTitle: "Health Insurance" }} />
    <Stack.Screen name="personalDetailForm" component={PersonalDetailsFormScreen} options={{ headerTitle: "Personal Detail" }} />
    <Stack.Screen name="vehiclePolicyForm" component={VehiclePolicyFormScreen} options={{ headerTitle: "Policy Details" }} />
    <Stack.Screen name="twoWheelerRegNumber" component={TwoWheelerRegNumberScreen} options={{ headerTitle: "Two Wheeler Insurance" }} />
    <Stack.Screen name="twoWheelerPolicyForm" component={TwoWheelerPolicyFormScreen} options={{ headerTitle: "Two Wheeler Insurance" }} />
    <Stack.Screen name="notification" component={NotificationScreen} options={{ headerTitle: "Notifications" }} />
    <Stack.Screen name="about" component={AboutUsScreen} options={{ headerTitle: "About Us" }} />
    <Stack.Screen name="claimForm" component={ClaimFormScreen} options={{ headerTitle: "Claim Request" }} />
    <Stack.Screen name="claimDetails" component={ClaimDetailsScreen} options={{ headerTitle: "Claim Details" }} />
    <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ headerTitle: "Edit Profile" }} />
    <Stack.Screen name="allocate" component={AllocatedMentorScreen} options={{ headerTitle: "Know Your Mentor" }} />
    <Stack.Screen name="refer" component={ReferScreen} options={{ headerTitle: "Refer Your Friends" }} />
    <Stack.Screen name="webview" component={WebviewQuatationScreen} options={{ headerTitle: "Refer Your Friends" }} />
    <Stack.Screen name="medicalHistory" component={MedicalHistoryScreen} options={{ headerTitle: "Medical History" }} />
    <Stack.Screen name="transactions" component={TransactionsScreen} options={{ headerTitle: "All Transactions" }} />
  </Stack.Navigator>
)