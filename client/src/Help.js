import React from "react";
import Faq from "react-faq-component";
import "../node_modules/video-react/dist/video-react.css";
import './help.css';
import './index.css';
// import video from "../src/assets/img/video.mkv";

const data = {
    title: "FAQ (How the System works)",
    rows: [
        {
            title: "What are the prerequisites for using the system?",
            content: "You need Metamask Browser Extension added and Ganache for running the system on a local Ethereum Blockchain.",
        },

        {
            title: "What do I register for?",
            content: "If you own a land and want to sell it, Register as a Buyer and if you want to buy a land, Register as a Buyer.",
        },
        {
            title: "Why can't I request for a Land Property after registering as Buyer?",
            content: "Your account profile and documents will first be verified by the Land Inspector and then you can request a Land.",
        },
        {
            title: "Why can't I add a Land Property after registering as Seller?",
            content: "Same answer as above!",
        },

    ],
};

const styles = {
    bgColor: 'dark',
    titleTextColor: "black",
    rowTitleColor: "grey",
    rowContentPaddingBottom: '10px',
    transitionDuration: "0.5s",
    timingFunc: "ease",
    //rowContentColor: 'grey',
    //arrowColor: "black",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function Help() {
    return (
        <>
            <div id="container" >
                <div id="topSection">
                    <div id="searchSection">
                    </div>
                </div>
            </div>

            <div className="container">
                

                <div style={{ marginTop: "10px" }}>
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                </div>
            </div>
        </>
    );
}