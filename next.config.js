const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_SERVER
} = require("next/constants")

module.exports = (phase, { defaultConfig }) => {
    console.log("phase=", phase)
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        // console.log(1)
        return {
            /* development only config options here */
            env: {
                FLASK_API_BASE: "http://localhost:5000"
            }
        }
    }
    if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        // console.log(2)
        return {
            /* config options for all phases except development here */
            env: {
                FLASK_API_BASE: "https://limitless-peak-52274.herokuapp.com"
            }
        }
    }
    // console.log(3)
    // return {
    //     env: {
    //         FLASK_API_BASE: "https://limitless-peak-52274.herokuapp.com3"
    //     }
    // }
    return defaultConfig
}