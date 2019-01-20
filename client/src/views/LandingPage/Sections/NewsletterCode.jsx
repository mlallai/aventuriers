import React from "react";

export default function NewsletterCode() {
  return (
    <div>
      {/* SendinBlue Signup Form HTML Code */}{" "}
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />{" "}
      <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
      <div id="sib_embed_signup" style={{ padding: "10px" }}>
        {" "}
        <div
          className="forms-builder-wrapper"
          style={{
            position: "relative",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {" "}
          <form
            className="description"
            id="theform"
            name="theform"
            action="https://my.sendinblue.com/users/subscribeembed/js_id/30kwv/id/1"
            method="POST"
          >
            {" "}
            <input type="hidden" name="js_id" id="js_id" defaultValue="30kwv" />
            <input type="hidden" name="listid" id="listid" defaultValue={9} />
            <input
              type="hidden"
              name="from_url"
              id="from_url"
              defaultValue="yes"
            />
            <input
              type="hidden"
              name="hdn_email_txt"
              id="hdn_email_txt"
              defaultValue
            />{" "}
            <input type="hidden" name="sib_simple" defaultValue="simple" />{" "}
            <input
              type="hidden"
              name="sib_forward_url"
              defaultValue="http://bourse-aux-aventuriers.herokuapp.com/"
              id="sib_forward_url"
            />{" "}
            <div
              className="sib-container rounded ui-sortable"
              style={{
                borderRadius: "4px",
                position: "relative",
                margin: "0px",
                textAlign: "left",
                background: "rgb(252, 252, 252)",
                padding: "40px 20px 20px",
                borderWidth: "0px !important",
                borderColor: "transparent !important"
              }}
            >
              {" "}
              <input
                type="hidden"
                name="req_hid"
                id="req_hid"
                defaultValue
                style={{ fontSize: "13px" }}
              />{" "}
              <div className="header" style={{ padding: "0px 20px" }}>
                {" "}
                <h1
                  className="title editable"
                  data-editfield="newsletter_name"
                  style={{
                    fontWeight: "normal",
                    textAlign: "left",
                    fontSize: "45px",
                    marginBottom: "2px",
                    padding: "0px",
                    marginTop: "0px",
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: "rgb(13, 134, 255)",
                    display: "none"
                  }}
                >
                  Ma Newsletter
                </h1>{" "}
                <h3
                  id="company-name"
                  style={{
                    fontWeight: "normal",
                    textAlign: "left",
                    fontSize: "25px",
                    marginBottom: "12px",
                    padding: "0px",
                    marginTop: "0px",
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: "rgb(52, 52, 52)",
                    display: "block"
                  }}
                >
                  Je m'inscris à la Newsletter Adventurer !
                </h3>{" "}
              </div>{" "}
              <div
                className="description editable"
                data-editfield="newsletter_description"
                style={{
                  padding: "0px 20px 15px",
                  borderBottom: "1px solid rgb(204, 204, 204)",
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  color: "rgb(52, 52, 52)",
                  fontSize: "17px",
                  display: "none"
                }}
              >
                Quel contenu souhaitez-vous partager avec vos contacts ?{" "}
              </div>{" "}
              <div className="view-messages" style={{ margin: "5px 0" }}>
                {" "}
              </div>{" "}
              {/* an email as primary */}{" "}
              <div
                className="primary-group email-group forms-builder-group ui-sortable"
                style={{}}
              >
                {" "}
                <div
                  className="row"
                  style={{
                    padding: "10px 20px",
                    fontSize: "17px",
                    position: "relative",
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: "rgb(52, 52, 52)",
                    left: "0px",
                    top: "0px"
                  }}
                >
                  <div
                    className="lbl-tinyltr"
                    style={{ clear: "both", float: "none" }}
                  >
                    Prénom
                  </div>{" "}
                  <input
                    type="text"
                    name="PRENOM"
                    id="PRENOM"
                    defaultValue
                    style={{
                      padding: "10px 2%",
                      width: "90%",
                      minWidth: "auto"
                    }}
                  />{" "}
                  <div className="clear" style={{ clear: "both" }} />
                </div>
                <div
                  className="row"
                  style={{
                    padding: "10px 20px",
                    fontSize: "17px",
                    position: "relative",
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: "rgb(52, 52, 52)",
                    left: "0px",
                    top: "0px"
                  }}
                >
                  <div
                    className="lbl-tinyltr"
                    style={{ clear: "both", float: "none" }}
                  >
                    Nom
                  </div>{" "}
                  <input
                    type="text"
                    name="NOM"
                    id="NOM"
                    defaultValue
                    style={{
                      padding: "10px 2%",
                      width: "90%",
                      minWidth: "auto"
                    }}
                  />{" "}
                  <div className="clear" style={{ clear: "both" }} />{" "}
                  <div
                    className="row mandatory-email"
                    style={{
                      padding: "10px 20px",
                      position: "relative",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      color: "rgb(52, 52, 52)",
                      fontSize: "17px"
                    }}
                  >
                    {" "}
                    <div
                      className="lbl-tinyltr"
                      style={{
                        clear: "both",
                        float: "none",
                        fontFamily:
                          '"Helvetica Neue", Helvetica, Arial, sans-serif'
                      }}
                    >
                      Adresse Email&nbsp;
                      <red style={{ color: "#ff0000" }}>*</red>{" "}
                    </div>{" "}
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      defaultValue
                      style={{
                        padding: "10px 2%",
                        width: "90%",
                        minWidth: "auto"
                      }}
                    />{" "}
                    <div style={{ clear: "both" }} />{" "}
                    <div className="hidden-btns">
                      {" "}
                      <a className="btn move" href="#">
                        <i className="fa fa-arrows" />
                      </a>
                      <br />{" "}
                      {/*<a class="btn btn-danger delete" href="#"><i class="fa fa-trash-o fa-inverse"></i></a>*/}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                <div
                  className="captcha forms-builder-group"
                  style={{ display: "none" }}
                >
                  <div
                    className="row"
                    style={{
                      padding: "10px 20px",
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      color: "rgb(52, 52, 52)",
                      fontSize: "17px"
                    }}
                  >
                    <div
                      id="gcaptcha"
                      style={{ transform: "scale(1)", marginLeft: "0px" }}
                    />
                  </div>
                </div>{" "}
                {/* end of primary */}{" "}
                <div
                  className="byline"
                  style={{
                    fontFamily:
                      '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: "rgb(52, 52, 52)",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "center",
                    display: "block"
                  }}
                >
                  {" "}
                  <button
                    className="button editable "
                    type="submit"
                    data-editfield="subscribe"
                    style={{
                      fontFamily:
                        '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      color: "rgb(255, 255, 255)",
                      background: "rgb(5, 5, 5)",
                      display: "inline-block",
                      whiteSpace: "nowrap",
                      minHeight: "40px",
                      margin: "0px 5px 0px 0px",
                      padding: "0px 22px",
                      textDecoration: "none",
                      textTransform: "uppercase",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontStyle: "normal",
                      fontSize: "17px",
                      cursor: "pointer",
                      border: "0px",
                      borderRadius: "4px",
                      verticalAlign: "top",
                      height: "auto",
                      lineHeight: "150%"
                    }}
                  >
                    S'inscrire
                  </button>
                </div>{" "}
                <div style={{ clear: "both" }} />{" "}
              </div>
            </div>
          </form>{" "}
        </div>{" "}
        {/* End : SendinBlue Signup Form HTML Code */}
      </div>
    </div>
  );
}
