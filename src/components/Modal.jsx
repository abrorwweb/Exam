import { Form, useActionData } from "react-router-dom";
import FormInput from "./FormInput";

function Modal() {
  const data = useActionData();
  console.log(data); // undefined

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold">Reset password:</h3>
        <Form>
          <FormInput name="email_for_reset" placeholder="Email" type="email" />
          <div className="modal-action">
            <button
              onClick={() => document.getElementById("my_modal_1").close()}
              type="button"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button className="btn btn-primary">Send</button>
          </div>
        </Form>
      </div>
    </dialog>
  );
}

export default Modal;
