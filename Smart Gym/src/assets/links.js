
import diamondPushups from "../assets/gifs/chest/diamondPushups.gif";
import declinePushups from "../assets/gifs/chest/DeclinePushups.gif";
import pushups from "../assets/gifs/chest/Pushups.gif";
import sideRaises from "../assets/gifs/shoulder/SideRaises.gif";
import widearmPushups from "../assets/gifs/chest/WidearmPushups.gif";
import inclinePushups from "../assets/gifs/chest/inclinePushups.gif";
import militaryPushups from "../assets/gifs/chest/militaryPushups.gif";
import pushupandRotation from "../assets/gifs/chest/pushandRotation.gif";
import kneePushup from "../assets/gifs/chest/KneePushups.gif";
import bicepCurls from "../assets/gifs/arms/BisepCurls.gif";
import hammerCurls from "../assets/gifs/arms/hammerCurls.gif";
import standingBicepCurls from "../assets/gifs/arms/StandingBicepCurls.gif";
import seatedCurls from "../assets/gifs/arms/seatedBicepCurls.gif"
import frontRaises from "../assets/gifs/shoulder/frontRaises.gif";
import staggeredPushups from "../assets/gifs/shoulder/staggeredPushups.gif";
 const chestBeginner = [
  { id: 1, gif: pushups, title: "Pushups", exerciseCount: "x10" },
  { id: 2, gif: kneePushup, title: "Knee Pushups", exerciseCount: "x10" },
  { id: 3, gif: widearmPushups, title: "Wide Arm Pushups", exerciseCount: "x10" },
  { id: 4, gif: militaryPushups, title: "Military Pushups", exerciseCount: "x10" },
  { id: 5, gif: pushupandRotation, title: "Pushups and Rotation", exerciseCount: "x10" },
];

const armsBeginner = [
  { id: 1, gif: bicepCurls, title: "Bicep Curls", exerciseCount: "x10" },
  { id: 2, gif: seatedCurls, title: "Seated Bicep Curls", exerciseCount: "x10" },
  { id: 3, gif: hammerCurls, title: "Hammer Curls", exerciseCount: "x10" },
  { id: 4, gif: diamondPushups, title: "Diamond Pushups", exerciseCount: "x10" },
  { id: 5, gif: standingBicepCurls, title: "Barbell Curls", exerciseCount: "x10" },
];

const shoulderBeginner = [
  { id: 6, gif: frontRaises, title: "Front Raises", exerciseCount: "x10" },
  { id: 3, gif: inclinePushups, title: "Incline Pushups", exerciseCount: "x10" },
  { id: 7, gif: sideRaises, title: "Side Raise", exerciseCount: "x10" },
  { id: 4, gif: declinePushups, title: "Decline Pushups", exerciseCount: "x10" },
  { id: 8, gif: staggeredPushups, title: "Staggered Pushups", exerciseCount: "x10" },

];

 
const chestIntermediate = [
  { id: 1, gif: pushups, title: "Pushups", exerciseCount: "x14" },
  { id: 2, gif: kneePushup, title: "Knee Pushups", exerciseCount: "x14" },
  { id: 3, gif: widearmPushups, title: "Wide Arm Pushups", exerciseCount: "x14" },
  { id: 4, gif: militaryPushups, title: "Military Pushups", exerciseCount: "x14" },
  { id: 5, gif: pushupandRotation, title: "Pushups and Rotation", exerciseCount: "x14" },
];

const armsIntermediate = [
  { id: 1, gif: bicepCurls, title: "Bicep Curls", exerciseCount: "x14" },
  { id: 2, gif: seatedCurls, title: "Seated Bicep Curls", exerciseCount: "x14" },
  { id: 3, gif: hammerCurls, title: "Hammer Curls", exerciseCount: "x14" },
  { id: 4, gif: diamondPushups, title: "Diamond Pushups", exerciseCount: "x14" },
  { id: 5, gif: standingBicepCurls, title: "Barbell Curls", exerciseCount: "x14" },
];



const shoulderIntermediate = [
  { id: 6, gif: frontRaises, title: "Front Raises", exerciseCount: "x14" },
  { id: 3, gif: inclinePushups, title: "Incline Pushups", exerciseCount: "x14" },
  { id: 7, gif: sideRaises, title: "Side Raise", exerciseCount: "x14" },
  { id: 4, gif: declinePushups, title: "Decline Pushups", exerciseCount: "x14" },
  { id: 8, gif: staggeredPushups, title: "Staggered Pushups", exerciseCount: "x14" },

];

const chestAdvanced = [
  { id: 1, gif: pushups, title: "Pushups", exerciseCount: "x18" },
  { id: 2, gif: kneePushup, title: "Knee Pushups", exerciseCount: "x18" },
  { id: 3, gif: widearmPushups, title: "Wide Arm Pushups", exerciseCount: "x18" },
  { id: 4, gif: militaryPushups, title: "Military Pushups", exerciseCount: "x18" },
  { id: 5, gif: pushupandRotation, title: "Pushups and Rotation", exerciseCount: "x18" },
];

const armsAdvanced = [
  { id: 1, gif: bicepCurls, title: "Bicep Curls", exerciseCount: "x18" },
  { id: 2, gif: seatedCurls, title: "Seated Bicep Curls", exerciseCount: "x18" },
  { id: 3, gif: hammerCurls, title: "Hammer Curls", exerciseCount: "x18" },
  { id: 4, gif: diamondPushups, title: "Diamond Pushups", exerciseCount: "x18" },
  { id: 5, gif: standingBicepCurls, title: "Barbell Curls", exerciseCount: "x18" },
];

const shoulderAdvanced = [
  { id: 6, gif: frontRaises, title: "Front Raises", exerciseCount: "x18" },
  { id: 3, gif: inclinePushups, title: "Incline Pushups", exerciseCount: "x18" },
  { id: 7, gif: sideRaises, title: "Side Raise", exerciseCount: "x18" },
  { id: 4, gif: declinePushups, title: "Decline Pushups", exerciseCount: "x18" },
  { id: 8, gif: staggeredPushups, title: "Staggered Pushups", exerciseCount: "x18" },

];
  
  
  
export const workoutMapping = {
    "CHEST BEGINNER": chestBeginner,
    "ARM BEGINNER": armsBeginner,

    "SHOULDER & BACK BEGINNER": shoulderBeginner,

    "CHEST INTERMEDIATE": chestIntermediate,
    "ARM INTERMEDIATE": armsIntermediate,

    "SHOULDER & BACK INTERMEDIATE": shoulderIntermediate,

    "CHEST ADVANCED": chestAdvanced,
    "ARM ADVANCED": armsAdvanced,

    "SHOULDER & BACK ADVANCED": shoulderAdvanced,
};