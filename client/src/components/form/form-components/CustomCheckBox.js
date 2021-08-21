import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import CheckBox from './Forms/CheckBox';
import colors from "../../../styles/colors";

const CustomCheckBox = (props) => {

  const classes = useStyles()

  return (
    <div className={[classes.checkboxContainer]}>
      <CheckBox
        isChecked={props.isSelected}
        onClick={props.setSelection}
        style={classes.checkbox}
        checkBoxColor={colors.PRIMARY}
        rightTextStyle={classes.textStyle}
        leftTextStyle={classes.textStyle}
        rightText={props.rightText}
        {...props}
      />
      {props.children}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  checkboxContainer: {
    flexDirection: "row",
    maxHeight: 40,
    // marginBottom: 20,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: "center"
  },
  textStyle:{
    color: colors.PRIMARY,
    // marginLeft: 4 
    // fontFamily: fonts.ROBOTO_LIGHT
  }
}));

export default CustomCheckBox;
