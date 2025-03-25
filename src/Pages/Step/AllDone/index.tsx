import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useWorkflowCompletion } from "@hooks/useWorkflow";
import "./index.less";

const StepAllDone: React.FC = () => {
  const navigate = useNavigate();
  const { run, messageContextHolder } = useWorkflowCompletion({
    success() {
      navigate("/review");
    },
  });

  const onGoBack = () => {
    navigate("/", { replace: true });
  };
  const onSubmit = () => run();

  return (
    <div className="step-all-done">
      {messageContextHolder}
      <div className="step-all-done-icon"></div>
      <div className="step-all-done-title">Hoorray — All done!</div>
      <div className="step-all-done-subtitle">
        Feel free to double-check. If everything looks good, go ahead and submit
        it.
        <br />
        <br />
        Your editor access will be temporarily paused while we conduct our
        review, and we'll follow up with you shortly.
      </div>
      <div className="step-all-done-button-group">
        <Button style={{ width: 200 }} onClick={onGoBack}>
          Back to Menu
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: 32, width: 200 }}
          onClick={onSubmit}
        >
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default StepAllDone;
