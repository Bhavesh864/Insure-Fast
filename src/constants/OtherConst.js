import React from "react";
import { BikeInsuranceSvgIcon, CarInsuranceSvgIcon, HealthInsuranceSvgIcon, LifeInsuranceSvgIcon, OtherMenuSvgIcon, TermInsuranceSvgIcon } from "../assets/svg/basicSvgs";


export const idvOptions = [
    {
        title: 'Lowest IDV',
        key: 'Lowest',
    },
    {
        title: 'Maximum IDV',
        key: 'Maximum'
    },
    {
        title: 'Choose Your IDV',
        key: 'Selected',
        placeholderTxt: 'Enter IDV Amount',
        showInput: true,
        value: '',
    }
]

export const AccesoriesList = [
    {
        title: 'Electrical Accessories',
        key: 1,
        value: '',
        placeholderTxt: 'Enter Electrical Amount'
    },
    {
        title: 'Non-Electrical Accessories',
        key: 2, value: '',
        placeholderTxt: 'Enter Non-Electrical Amount'

    },

]
export const AdditionalCoversList = [
    {
        title: 'Paid Driver Cover',
        key: 1,
        value: '',
        placeholderTxt: '0'
    },
    {
        title: 'Owner Driver PA Cover',
        key: 2,
    },
    {
        title: 'Unnamed Passenger PA Cover',
        key: 3,
        value: '',
        placeholderTxt: '0'
    },

]

export const passengerArr = [
    {
        amount: 10000,
        key: 1
    },
    {
        amount: 20000,
        key: 2
    },
    {
        amount: 30000,
        key: 3
    },
    {
        amount: 40000,
        key: 4
    },
    {
        amount: 50000,
        key: 5
    },
    {
        amount: 60000,
        key: 6
    },
    {
        amount: 70000,
        key: 7
    },
    {
        amount: 80000,
        key: 8
    },
    {
        amount: 90000,
        key: 9
    },
    {
        amount: 100000,
        key: 10
    },
    {
        amount: 110000,
        key: 11
    },
    // {
    //     amount: 120000,
    //     key: 12
    // },
    {
        amount: 130000,
        key: 13
    },
    // {
    //     amount: 140000,
    //     key: 14
    // },
    {
        amount: 150000,
        key: 15
    },
    {
        amount: 160000,
        key: 16
    },
    // {
    //     amount: 170000,
    //     key: 17
    // },
    {
        amount: 180000,
        key: 18
    },
    // {
    //     amount: 190000,
    //     key: 19
    // },
    {
        amount: 200000,
        key: 20
    },
]

export const AddOnsList = [
    {
        title: 'Zero Depreciation',
        key: 1
    },
    {
        title: '24x7 Roadside Assistance',
        key: 2
    },
    {
        title: 'Engine Gearbox Cover',
        key: 3
    },
    {
        title: 'NCB Protection',
        key: 4
    },
    {
        title: 'Key & Lock Replacement',
        key: 5
    },
    {
        title: 'Consumables',
        key: 6
    },
    {
        title: 'Daily Allowance'
        , key: 7
    },
    {
        title: 'Invoice Cover',
        key: 8
    },
    {
        title: 'Tyre Protector',
        key: 9
    },
    {
        title: 'RIM Damage Cover',
        key: 10
    },
    {
        title: 'Loss of Personal Belongings',
        key: 11
    },
    {
        title: 'Voluntary Deductive',
        key: 12,
        value: '',
        placeholderTxt: '0'
    },
]


export const insuranceTypesArr = [
    {
        name: "Health Insurance",
        key: "healthInsuranceFor",
        icon: <HealthInsuranceSvgIcon />,
        image: require("../assets/images/types/healthcare.png")
    },
    {
        name: "Car Insurance",
        key: "carRegistration",
        icon: <CarInsuranceSvgIcon />,
        image: require("../assets/images/types/car.png"),
        payloads: { vehicleType: "Pvt Car", title: "Car Insurance" }
    },
    {
        name: "Two Wheeler Insurance",
        key: "carRegistration", //"twoWheelerRegNumber",
        icon: <BikeInsuranceSvgIcon />,
        image: require("../assets/images/types/scooter.png"),
        payloads: { vehicleType: "MotorBike", title: "Two Wheeler Insurance" }
    },
    {
        name: "Taxi Insurance",
        key: "carRegistration",
        icon: <TermInsuranceSvgIcon />,
        image: require("../assets/images/types/pcv.jpeg"),
        payloads: { vehicleType: "Passenger Carrying", title: "PCV Insurance" }
    },
    {
        name: "Goods Carrying Vehicle (GCV)",
        key: "carRegistration",
        icon: <TermInsuranceSvgIcon />,
        image: require("../assets/images/types/commercialVehicle.png"),
        payloads: { vehicleType: "Goods Carrying", title: "GCV Insurance" }
    },
    {
        name: "Private Car TP",
        key: "carRegistration",
        icon: <TermInsuranceSvgIcon />,
        image: require("../assets/images/types/sport-car.png"),
        payloads: { vehicleType: "Pvt Car", title: "Car Insurance", isThirdParty: true }
    },
    {
        name: "Private Two Wheeler TP",
        key: "carRegistration",
        icon: <TermInsuranceSvgIcon />,
        image: require("../assets/images/types/motorbike.png"),
        payloads: { vehicleType: "MotorBike", title: "Two Wheeler Insurance", isThirdParty: true }
    },
    {
        name: "Life Insurance\n(Coming Soon)",
        key: "",
        icon: <LifeInsuranceSvgIcon />,
        image: require("../assets/images/types/umberella.png")
    },
]


export const insurancePlans = [
    {
        name: "ICICI Lombard",
        coverValue: "933800",
        price: "3,789",
        coverTime: "1 year",
        image: require("../assets/images/plans/icici.png")
    },
    {
        name: "Kotak General Insurance",
        coverValue: "933800",
        price: "3,789",
        coverTime: "1 year",
        image: require("../assets/images/plans/kotak.png")
    }
]



export const carBrandsArr = [
    {
        name: "MARUTI",
        key: "maruti",
        // image: require("../assets/images/brands/suzuki.png")
    },
    {
        name: "HONDA",
        key: "honda",
        // image: require("../assets/images/brands/honda.png")
    },
    {
        name: "TOYOTA",
        key: "toyota",
        // image: require("../assets/images/brands/toyota.png")
    },
    {
        name: "FORD",
        key: "ford",
        // image: require("../assets/images/brands/ford.png")
    },
    {
        name: "VOLVO",
        key: "volvo",
        // image: require("../assets/images/brands/volvo.png")
    },
    {
        name: "AUDI",
        key: "audi",
        // image: require("../assets/images/brands/audi.png")
    },
]



export const hondaCarModals = [
    {
        name: "ACCORD",
        key: "accord"
    },
    {
        name: "ACCORD HYBRID",
        key: "accordHYBRID"
    },
    {
        name: "AMAZE",
        key: "amaze"
    },
    {
        name: "BR-V",
        key: "brv"
    },
    {
        name: "BRIO",
        key: "brio"
    },
    {
        name: "BRIO NEW",
        key: "brioNew"
    },
    {
        name: "NEW CITY",
        key: "newCity"
    },
    {
        name: "MOBILIO",
        key: "mobilio"
    },
    {
        name: "CONCERTO",
        key: "concerto"
    },
]



export const hondaCarVariants = [
    {
        name: "2.3 VTI(AT)",
        key: "2.3 VTI(AT)"
    },
    {
        name: "2.3 VTI(MT)",
        key: "2.3 VTI(MT)"
    },
    {
        name: "2.4 (AT)",
        key: "2.4 (AT)"
    },
    {
        name: "2.4 INSPIRE(AT)",
        key: "2.4 INSPIRE(AT)"
    },
    {
        name: "2.4 (MT)",
        key: "2.4 (MT)"
    },
    {
        name: "2.4 INSPIRE(MT)",
        key: "2.4 INSPIRE(MT)"
    }
]


export const previousPolicyStatusesArr = [
    {
        title: "Just third party insurance only",
        key: "thirdParty"
    },
    {
        title: "Standalone OD only policy?",
        key: "standaloneOD"
    },
    // {
    //     title: "Dont remember previous insure",
    //     key: "DontRemember"
    // },
    {
        title: "Comprehansive policy",
        key: "comprehensive"
    },
    // {
    //     title: "Bundled",
    //     key: "bundled"
    // }
]



export const policyExpiryArr = [
    {
        title: "Not Expired",
        key: "continue"
    },
    {
        title: "Expired within 90 days",
        key: "expired within 90 day"
    },
    {
        title: "Expired more than 90 days",
        key: "expired above 90 day"
    },
    {
        title: "Not Remeber!",
        key: "none"

    }
]


export const healthInsuranceForArr = [
    {
        title: "Self",
        key: "self"
    },
    {
        title: "Spouse",
        key: "spouse"
    },
    {
        title: "Son",
        key: "son"
    },
    {
        title: "Daughter",
        key: "daughter"
    },
    {
        title: "Father",
        key: "father"
    },
    {
        title: "Mother",
        key: "mother"
    },
    // {
    //     title: "Other Members",
    //     key: "other"
    // }
]

export const otherHealthInsuranceForArr = [
    // {
    //     title: "Mother",
    //     key: "mother"
    // },
    {
        title: "Grand father",
        key: "grandFather"
    },
    {
        title: "Grand Mother",
        key: "grandMather"
    },
    {
        title: "Father-in-law",
        key: "fatherInLaw"
    },
    {
        title: "Mother-in-law",
        key: "motherInLaw"
    }
]


export const medicalHistoryArr = [
    {
        key: 1,
        title: 'Existing illness',
        subtitle: 'Blood Pressure, Diabetes, Heart conditions, Asthma, Thyroid, Cancer etc.'
    },
    {
        key: 2,
        title: 'Surgical Procedure',
        subtitle: 'Appendix, Gall bladder, C-section etc.'
    },
    {
        key: 3,
        title: 'None of these',
        subtitle: ''
    }
]


export const diseasesArr = [
    {
        key: 1,
        title: 'Diabetes'
    },
    {
        key: 2,
        title: 'BP / Hypertension'
    },
    {
        key: 3,
        title: 'Heart Ailments'
    },
    {
        key: 4,
        title: 'Other health issues'
    },
]


export const staticCitiesArr = [
    {
        City: "Delhi"
    },
    {
        City: "Bengaluru"
    },
    {
        City: "Pune"
    },
    {
        City: "Mumbai"
    },
    {
        City: "Hyderabad"
    },
    {
        City: "Gurgaon"
    },
    {
        City: "Thane"
    },
    {
        City: "Ghaziabad"
    },
    {
        City: "Lucknow"
    },
    {
        City: "Jaipur"
    },
]


export const healthInsurancePlansArr = [
    {
        name: "Digit insurance",
        covervalue: 300000,
        featuresArr: ["Single pvt AC Room", "5 lakh No Claim Bonus", "Unlimited Restoration of Cover"],
        price: 589,
        image: require("../assets/images/plans/digit.png")
    },
    {
        name: "IFFCO Tokyo",
        covervalue: 300000,
        featuresArr: ["Single pvt AC Room", "5 lakh No Claim Bonus", "Unlimited Restoration of Cover"],
        price: 589,
        image: require("../assets/images/plans/iffco.png")
    },
]

export const previousPolicyTypes = [
    {
        title: "Comprehensive",
        key: "comprehensive"
    },
    {
        title: "Third Party",
        key: "thirdParty"
    }
]


export const newPolicyTypes = [
    {
        title: "Comprehensive",
        key: "Comprehensive"
    },
    {
        title: "Third Party",
        key: "ThirdParty"
    },
    {
        title: "StandAlone OD",
        key: "own_damage"
    }
]

export const commercialVehiclePolicyList = [
    {
        title: "Comprehensive",
        key: "Comprehensive"
    },
    {
        title: "Third Party",
        key: "ThirdParty"
    },
]

export const pcvGcvPolicyTypes = [
    {
        title: "Comprehensive",
        key: "Comprehensive"
    },
    {
        title: "Third Party",
        key: "ThirdParty"
    },
]

export const ownershipTypesArr = [
    {
        title: "Individual",
        key: "individual"
    },
    {
        title: "Organization",
        key: "organization"
    }
]


// export const childAgeLimitArr=[
//     {
//         title:""
//     }
// ]

export const getChildAgeArr = () => {
    let max = 30;
    let arr = []
    for (let i = 1; i <= (max + 2); i++) {
        let obj = {}
        if (i == 1) {
            obj = {
                title: `17-90 Days`,
                key: "17-90 Days"
            }
        }
        else if (i == 2) {
            obj = {
                title: `3-12 Months`,
                key: "3-12 Months"
            }
        }
        else {
            obj = {
                title: `${i - 2} year`,
                key: `${i - 2}`
            }
        }
        arr = [...arr, obj]
    }
    return arr
}


export const getAdultAgeArr = (minAge = 18) => {
    let max = 100;
    let arr = []
    for (let i = minAge; i <= (max); i++) {
        let obj = {}
        obj = {
            title: `${i} year`,
            key: `${i}`
        }
        arr = [...arr, obj]
    }
    return arr
}



export const vehicleTypesObj = {
    car: "Pvt Car",
    bike: "MotorBike",
    gcv: "gcv",
    pcv: "pcv",
    trailer: "Trailer",
    miscellaneous: "Miscellaneous"
}