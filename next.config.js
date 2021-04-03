const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD
} = require("next/constants")

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
            env: {
                FLASK_API_BASE: "http://localhost:5000"
            }
        }
    }
    if (phase === PHASE_PRODUCTION_BUILD) {
        return {
            /* config options for all phases except development here */
            env: {
                FLASK_API_BASE: "https://limitless-peak-52274.herokuapp.com"
            }
        }
    }
    return defaultConfig
}