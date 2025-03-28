import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Confetti from "@components/Confetti";
import { useWorkflowCompletion } from "@hooks/useWorkflow";
import "./index.less";

const StepAllDone: React.FC = () => {
  const navigate = useNavigate();
  const { run, messageContextHolder } = useWorkflowCompletion({
    success() {
      setTimeout(() => {
        navigate("/");
      }, 300);
    },
  });

  const onGoBack = () => {
    navigate("/", { replace: true });
  };
  const onSubmit = () => run();

  return (
    <div className="step-all-done">
      {messageContextHolder}
      <Confetti
        particleCount={40}
        rotationRange={[90, 270]}
        durationRange={[0, 3000]}
        totalDuration={3000}
        spread={1}
        colors={[
          { color: "#FFFFFF", weight: 0.1 },
          { color: "#7F40C9", weight: 0.2 },
          { color: "#2B6FF6", weight: 0.7 },
        ]}
        containerStyle={{
          position: "absolute",
          top: -75,
          bottom: 0,
          left: 0,
          right: 0,
          height: "auto",
          zIndex: 200,
          pointerEvents: "none",
        }}
        particleStyle={() => ({ width: 38, height: 75 })}
      />
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
