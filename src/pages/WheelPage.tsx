import Button from "../components/button/Button";
import CheckboxRemoveQuestion from "../components/checkbox/CheckboxRemoveQuestion";
import Wheel from "../components/wheel/Wheel";
import { useWheelContext } from "../context/useWheelContext";
import { useWheel } from "../hooks/useWheel";

const WheelPage = () => {
  const { questions } = useWheelContext();
  const {
    colors,
    handleTextareaChange,
    handleRemoveQuestion,
    isRemoveQuestion,
    resetWheel,
    rotation,
    selectedQuestion,
    spinWheel,
  } = useWheel();

  return (
    <>
      <div className="title">
        <p>¡Ruleta de la suerte!</p>
      </div>
      <div className="container-selected-question">
        <div
          className="selected-question"
          style={{ display: selectedQuestion ? "block" : "none" }}
        >
          <p>{selectedQuestion}</p>
        </div>
      </div>
      <div className="container">
        <Wheel
          questions={questions}
          rotation={rotation}
          onSpin={spinWheel}
          colors={colors}
        />
        <div className="textarea-container">
          <p className="title-textarea">Datos Para La Ruleta</p>
          <textarea
            title="Ingresa datos"
            name="questions"
            id="questions-area"
            className="questions-area"
            placeholder="Ingresa los datos finalizando con un enter para cada uno"
            onChange={handleTextareaChange}
          ></textarea>
          <div>
            <CheckboxRemoveQuestion
              label="Eliminar pregunta seleccionada"
              checked={isRemoveQuestion}
              onChange={handleRemoveQuestion}
            />

            <Button className="spin-button" onClick={spinWheel}>
              Girar
            </Button>
            <Button className="reset-button" onClick={resetWheel}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WheelPage;
