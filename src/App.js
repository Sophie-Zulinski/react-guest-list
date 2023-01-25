import './App.css';

function App() {
  return (
    <>
      <div className='data-test-id="guest"'>
        <form>
          <div>textfield First name -usestate onchange </div>;
          <div>
            textfield Last name -usestate onchange when pressing return guest is
          </div>
          <button aria-label="data-test-id=`guest`">Remove</button>{' '}
          {/*-to clear all input of the form*/}
          <div>
            <label>
              <input
                aria-label="fist name last name attending status"
                type="checkbox"
              />
              Checkbox{' '}
              {/*-if clicked --> attending, if not --> not attending */}
            </label>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
