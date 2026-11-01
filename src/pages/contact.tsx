import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import NameInput from "../components/Form/nameInput";
import TextInput from "../components/Form/textInput";
import EmailInput from "../components/Form/emailInput";
import validate from "../components/Form/validator";
import './contact.css'


interface MyProps {}

interface MyState {
  trySubmit: boolean;
  formIsValid: boolean;
  sending: boolean;
  showConfirmMsg: boolean;
  showErrorMsg: boolean;
  formControls: {[key: string]: any}
}

class Contact extends React.Component<MyProps, MyState> {

  static defaultProps: MyProps = {}
  state: Readonly<MyState> = {
    trySubmit: false,
    formIsValid: false,
    sending: false,
    showConfirmMsg: false,
    showErrorMsg: false,

    formControls: {
      email: {
        value: '',
        placeholder: "Please enter your email address",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 4,
          isEmail: true,
          isRequired: true
        }
      },
      name: {
        value: '',
        placeholder: "Please enter your name",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 3,
          isRequired: true
        }
      },
      textarea: {
        value: '',
        placeholder: "Please provide details",
        valid: false,
        touched: false,
        validationRules: {
          minLength: 1,
          isRequired: true
        }
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  triggerConfirmMsg = () => {
    this.setState({
      showConfirmMsg: true
    })
    setTimeout(() => {
      this.setState({
        showConfirmMsg: false
      })
    }, 5000);
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    
    
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });
  
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const data = {
      name: this.state.formControls.name.value,
      email: this.state.formControls.email.value,
      message: this.state.formControls.textarea.value,
    }

    this.setState({ sending: true, showErrorMsg: false, showConfirmMsg: false });

    // Sending Message through the Resend function in src/api/contact.ts
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    } catch (error) {
      console.error(error);
      // Keep the visitor's message in the form so they can try again
      this.setState({ sending: false, showErrorMsg: true });
      return;
    }

    const updatedControls = {
      ...this.state.formControls
    };

    const formIsValid = false

    for (let inputIdentifier in updatedControls) {
      updatedControls[inputIdentifier].value = '';
      updatedControls[inputIdentifier].valid = false;
      updatedControls[inputIdentifier].touched = false;
    }

    // Clear Form Input
    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid,
      sending: false,
      trySubmit: true
    });
    this.triggerConfirmMsg()
  }

  render() {

    return (
      <Layout>
        <section className="container home-section">
          <div className="img-wrapper">
              <div className="duk-image"></div>
            </div>
            <div className="home-section__content">
              <h1 className="title">Contact Me</h1>
              <span className="text-content">
              <form onSubmit={this.handleSubmit} className="request-form" id="request-form">
                <h4>Hi! How can I help you? <i className="underline-box"></i></h4>
                  <p className="p-b-0">HI! MY NAME IS <span className="required">*</span></p>
                  <NameInput 
                    value={this.state.formControls.name.value}
                    placeholder={this.state.formControls.name.placeholder}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.name.touched}
                    valid={this.state.formControls.name.valid}
                  />

                  <p className="p-b-0">MY EMAIL ADDRESS IS <span className="required">*</span></p>
                  <EmailInput
                    value={this.state.formControls.email.value}
                    placeholder={this.state.formControls.email.placeholder}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.email.touched}
                    valid={this.state.formControls.email.valid} 
                  />

                  <p className="p-b-0">I NEED HELP WITH <span className="required">*</span></p>
                  <TextInput
                    value={this.state.formControls.textarea.value}
                    placeholder={this.state.formControls.textarea.placeholder}
                    onChange={this.changeHandler}
                    touched={this.state.formControls.textarea.touched}
                    valid={this.state.formControls.textarea.valid}
                  />

                  <div className="form-group">
                      <input type="submit" name="send" id="send" disabled={!this.state.formIsValid || this.state.sending} value={this.state.sending ? "Sending..." : "Send"}/>
                      {this.state.showConfirmMsg? (<p className="success">Thanks for your Message!<br/>I will get in touch with you soon.</p>) : null}
                      {this.state.showErrorMsg? (<p className="failure">Sorry, your message could not be sent.<br/>Please try again.</p>) : null}
                  </div>
                </form>
              </span>
            </div>
        </section>

      <div className="bg-circle-1"></div>
      <div className="bg-circle-2"></div>
      <div className="bg-circle-3"></div>
      
      </Layout>
    )
  }
}

export default Contact

export const Head = () => <SEO title="Contact - Uche Nwakwuo {Dukstack}" />
