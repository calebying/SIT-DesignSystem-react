import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from './components/ModalCom';
import Accordion from './components/AccordionCom';
import DatepickerCom from './components/DatepickerCom';
import '@sit-canvas/canvas-css/css/sit-canvas.css';
import ButtonCom from './components/ButtonCom';

function App() {
  return (
    <>
      <Modal></Modal>
      <Accordion />
      <DatepickerCom />
      <ButtonCom />
    </>
  );
}

export default App;
