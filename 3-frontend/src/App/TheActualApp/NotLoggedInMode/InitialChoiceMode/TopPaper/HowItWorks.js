import { createElement as e, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const getStyles = () => {

    return {

        buttonPaper: {

            borderRadius: 4,
            backgroundColor: 'black',
            width: 320,
            // height: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        button: {

            backgroundColor: 'green',
            color: 'white',
            marginTop: 15,
            marginBottom: 15,
            width: '90%',
        },

        howItWorksTextSection: {
            borderRadius: 4,

            backgroundColor: 'black',
            width: '100%',
            paddingTop: 5,
            // paddingBottom: 5,
        },

        howItWorksText: {

            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center',
        },

        text: {

            color: 'black',
        },
        
        icon: {

            fontSize: 50,
        },
    };
};

const tutorialSteps = [
    {
      label: 'Create an account with your email',
      imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Deposit Bitcoin into your account',
      imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Exchange your Bitcoin for Dynasty Bitcoin',
      imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Play fun games using your Dynasty Bitcoin!🎮',
        imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
      label: 'Exchange your Dynasty Bitcoin for Bitcoin and withdraw with 0 platform fees!😃 (Bitcoin network fee only)',
    //   label: 'tetst',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: [
            'Follow ',
            e(
                'a',
                {
                    key: 'daLinky',
                    href: 'https://twitter.com/DynastyBitcoin',
                    target: '_blank',
                    style: {
                        color: 'lightblue',
                    }
                },
              `@DynastyBitcoin on Twitter`  
            ),
            ' for exciting updates about new Bitcoin games and fun new crypto technology!👩‍🔬🧑‍🔬📈'
        ],
        //   label: 'tetst',
        imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

const useStyles = makeStyles((/*theme*/) => ({
    root: {
        width: 320,
        flexGrow: 1,
            // display: 'flex',
        // justifyContent: 'space-between',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 75,
        width: '100%',
        // paddingLeft: theme.spacing(4),
        backgroundColor: 'black',
    },
    headerText: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        padding: 5,
    },
    img: {
        height: 255,
        width: 320,
        overflow: 'hidden',
        display: 'block',
        // width: '100%',
    },
    mobileStepper: {
        // height: 
        borderRadius: 4,
        backgroundColor: 'black',
        borderColor: 'white',
        color: 'white',
    },
    mobileStepperButton: {
        // height: 
        backgroundColor: 'black',
        color: 'white',
    },
    dot: {
        backgroundColor: 'grey'
    },
    dotActive: {
        backgroundColor: 'white',
    }
}));


export default () => {

    const styles = getStyles();

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = tutorialSteps.length;
  
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return e(
        Paper,
        {
            style: styles.buttonPaper,
            elevation: 5,
        },
        e(
            'div',
            {
                style: styles.howItWorksTextSection,
            },
            e(
                Typography,
                {
                    style: styles.howItWorksText,
                },
                'How It Works'
            )
        ),
        e(
            Divider,
            {
                style: {
                    backgroundColor: 'white',
                    width: '50%',
                }
            }
        ),
        // e(
        //     Typography,
        //     {
        //         style: styles.howItWorksText,
        //     },
        //     'How it Works'
        // ),
        // e(
        //     PersonAddIcon,
        //     {
        //         style: styles.icon,
        //     }
        // ),
        // e(
        //     Typography,
        //     {
        //         style: styles.text,
        //     },
        //     'Login using your email'
        // )

        e(
            'div',
            {
                className: classes.root,
            },
            e(
                'div',
                {
                    className: classes.header,
                    // square: true,
                    elevation: 0,   
                },
                e(
                    Typography,
                    {
                        className: classes.headerText,
                    },
                    tutorialSteps[activeStep].label
                )
            ),
            // e(
            //     'img',
            //     {
            //         className: classes.img,
            //         src: tutorialSteps[activeStep].imgPath,
            //         alt: tutorialSteps[activeStep].label,
            //     }
            // ),
            e(
                MobileStepper,
                {
                    // className: ,
                    classes: {
                        root: classes.mobileStepper, // class name, e.g. `classes-nesting-root-x`
                        dot: classes.dot, // class name, e.g. `classes-nesting-label-x`
                        dotActive: classes.dotActive,
                    },
                    height: 32,
                    steps: maxSteps,
                    position: 'static',
                    variant: 'dots',
                    // variant: 'text',
                    activeStep,
                    nextButton: e(
                        Button,
                        {
                            className: classes.mobileStepperButton,
                            size: 'small',
                            onClick: handleNext,
                            disabled: (activeStep === maxSteps - 1)
                        },
                        'Next',
                        (theme.direction === 'rtl') ? e( KeyboardArrowLeft ) : e( KeyboardArrowRight ),
                    ),
                    backButton: e(
                        Button,
                        {
                            className: classes.mobileStepperButton,
                            size: 'small',
                            onClick: handleBack,
                            disabled: (activeStep === 0)
                        },
                        'Back',
                        (theme.direction === 'rtl') ? e( KeyboardArrowRight ) : e( KeyboardArrowRight ),
                    ),
                }
            )
        )
    );
};
