import React, { useEffect, useState } from "react";
import { ContractData, LoadingContainer } from "@drizzle/react-components";
import { DrizzleProvider } from "@drizzle/react-plugin";
import { Component } from "react";
import { Spinner } from "react-bootstrap";
// reactstrap components
import { Card, CardBody, Col, Row } from "reactstrap";
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import "../index.css";

const drizzleOptions = {
  contracts: [Land],
};
let rowT = [];

export const ViewImageTemp = () => {
  const [state, setState] = useState({
    LandInstance: undefined,
    account: null,
    web3: null,
    flag: null,
    verified: "",
    registered: "",
    count: 0,
    id: "",
    row: [],
  });
  const [row, setRow] = useState([]);
  const viewImage = (landId) => {
    alert(landId);
    this.props.history.push({
      pathname: "/viewImage",
    });
  };

  const func = async () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      //Get network provider and web3 instance
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Land.networks[networkId];
      const instance = new web3.eth.Contract(
        Land.abi,
        deployedNetwork && deployedNetwork.address
      );

      const currentAddress = await web3.currentProvider.selectedAddress;
      console.log(currentAddress);

      //.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
      let verified = await instance.methods.isVerified(currentAddress).call();
      console.log(verified);

      //setState({ ...state, verified: verified });
      var registered = true;

      let temp = state;
      temp = {
        ...temp,
        LandInstance: instance,
        web3: web3,
        account: accounts[0],
        registered: registered,
        verified: verified,
      };
      setState(temp);

      var count = await instance.methods.getLandsCount().call();

      count = parseInt(count);
      console.log(typeof count);
      console.log(count);
      //this.setState({count:count});

      var rowsArea = [];
      var rowsCity = [];
      var rowsState = [];
      var rowsSt = [];
      var rowsPrice = [];
      var rowsPID = [];
      var rowsSurvey = [];
      var rowsIpfs = [];
      var rowsDocs = [];

      for (var i = 1; i < count + 1; i++) {
        rowsArea.push(
          <ContractData
            contract="Land"
            method="getArea"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsCity.push(
          <ContractData
            contract="Land"
            method="getCity"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsState.push(
          <ContractData
            contract="Land"
            method="getState"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsSt.push(
          <ContractData
            contract="Land"
            method="getStatus"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsPrice.push(
          <ContractData
            contract="Land"
            method="getPrice"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsPID.push(
          <ContractData
            contract="Land"
            method="getPID"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        rowsSurvey.push(
          <ContractData
            contract="Land"
            method="getSurveyNumber"
            methodArgs={[
              i,
              { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" },
            ]}
          />
        );
        // rowsIpfs.push((<ContractData contract="Land" method="getImage"  methodArgs={[i, { from: "0xa42A8B478E5e010609725C2d5A8fe6c0C4A939cB" }]} />));
      }
      console.log(rowsCity);

      console.log(count);
      let t = [];
      for (var i = 1; i < count + 1; i++) {
        var landImg = await instance.methods.getImage(i).call();
        rowsIpfs.push(landImg);
        var document = await instance.methods.getDocument(i).call();
        rowsDocs.push(document);

        // row.push(<> <Col xs="6><Card style={{textAlign: "center"}}>
        //   <CardHeader><CardTitle><h2>Land {i}</h2></CardTitle></CardHeader>
        // <CardBody><div><img src={`https://ipfs.io/ipfs/${landImg}`} alt="" width="90%" height="90%" style={{marginBottom:"10px"}}/><p>Area: {rowsArea[i-1]}</p><p>City: {rowsCity[i-1]}</p><p>State: {rowsState[i-1]}</p><p>PID: {rowsPID[i-1]}</p><p>Price: {rowsPrice[i-1]}</p>
        // </div></CardBody></Card></Col></>)

        t.push({
          landImg: landImg,
          rowsArea: rowsArea[i - 1],
          rowsCity: rowsCity[i - 1],
          rowsState: rowsState[i - 1],
          rowsPID: rowsPID[i - 1],
          rowsSurvey: rowsSurvey[i - 1],
          rowsPrice: rowsPrice[i - 1],
          document: document,
        });
        rowT.push(
          <Col xs="6">
            <div class="post-module">
              <div class="thumbnail">
                <div class="date">
                  <div class="day">{i}</div>
                </div>
                <img src={`https://ipfs.io/ipfs/${landImg}`} />
              </div>

              <div class="post-content">
                <div class="category">Photos</div>
                <h1 class="title">{rowsArea[i - 1]} Sq. m.</h1>
                <h2 class="sub_title">
                  {rowsCity[i - 1]}, {rowsState[i - 1]}
                </h2>
                <p class="description">
                  PID: {rowsPID[i - 1]}
                  <br /> Survey No.: {rowsSurvey[i - 1]}
                </p>
                <div class="post-meta">
                  <span class="timestamp">Price: ₹ {rowsPrice[i - 1]}</span>
                </div>
                <div class="post-meta">
                  <span class="timestamp">
                    View Verified Land{" "}
                    <a
                      href={`https://ipfs.io/ipfs/${document}`}
                      target="_blank"
                    >
                      Document
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </Col>
        );
      }
      setRow(t);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(row);
  }, [row]);

  useEffect(async () => {
    await func();
  }, []);

  // if (!state.web3) {
  //   return (
  //     <div>
  //       <div>
  //         <h1>
  //           <Spinner animation="border" variant="primary" />
  //         </h1>
  //       </div>

  //     </div>
  //   );
  // }

  // if (!state.registered || !state.verified) {
  //   return (
  // <div className="content">
  //   <div>
  //     <Row>
  //       <Col xs="6">
  //         <Card>
  //           <CardBody>
  //             <h1>
  //               You are not verified to view this page
  //             </h1>
  //           </CardBody>
  //         </Card>
  //       </Col>
  //     </Row>
  //   </div>

  // </div>
  //   );
  // }

  return (
    <>
      {!state.web3 ? (
        <div>
          <div>
            <h1>
              <Spinner animation="border" variant="primary" />
            </h1>
          </div>
        </div>
      ) : !state.registered || !state.verified ? (
        <div className="content">
          <div>
            <Row>
              <Col xs="6">
                <Card>
                  <CardBody>
                    <h1>You are not verified to view this page</h1>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <div className="content">
          <DrizzleProvider options={drizzleOptions}>
            <LoadingContainer>
              <Row>
                {/* {row.length>0 && row.map((r) => {
                  return (
                    0
                  )
                }) } */}
                {row.length >0 && row.map((r,i) => {
                  return (
                    <>
                      <Col xs="6">
                        <div class="post-module">
                          <div class="thumbnail">
                            <div class="date">
                              <div class="day">{i+1}</div>
                            </div>
                            <img src={`https://ipfs.io/ipfs/${r.landImg}`} />
                          </div>
                      {/* WOrking till this */}
                          <div class="post-content">
                            <div class="category">Photos</div>
                            {/* <h1 class="title">{r.rowsArea} Sq. m.</h1>
                            <h2 class="sub_title">
                              {r.rowsCity}, {r.rowsState}
                            </h2> */}
                            {/* <p class="description">
                              PID: {r.rowsPID}
                              <br /> Survey No.: {r.rowsSurvey}
                            </p>
                            <div class="post-meta">
                              <span class="timestamp">
                                Price: ₹ {r.rowsPrice}
                              </span>
                            </div>
                            <div class="post-meta">
                              <span class="timestamp">
                                View Verified Land{" "}
                                <a
                                  href={`https://ipfs.io/ipfs/${r.document}`}
                                  target="_blank"
                                >
                                  Document
                                </a>
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </LoadingContainer>
          </DrizzleProvider>
        </div>
      )}
    </>
  );
};
