import { PracticeInfo } from "@config/practice";
import "./index.less";

interface StepFormProps {
  practiceInfo: PracticeInfo;
  style?: React.CSSProperties;
}

const StepForm: React.FC<StepFormProps> = ({ practiceInfo, style }) => {
  const { formTitle } = practiceInfo;

  return (
    <div className="step-form-container" style={style}>
      <div className="step-form-title">{formTitle}</div>
    </div>
  );
};

export default StepForm;
