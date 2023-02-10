//VERSION=3
function setup() {
    return {
        input: [
            {
                bands: ["PRED", "dataMask"] // this sets which bands to use
            }
        ],
        output: {
            bands: 4
        },
        mosaicking: "TILE"
    };
}

function evaluatePixel(samples) {
    for (let i = 0; i < samples.length; i++) {
        let sample = samples[i];
        if (sample.dataMask == 0) {
            continue;
        }

        if (sample.PRED == 1) {
            return [22 / 256, 92 / 256, 56 / 256, sample.dataMask];
        } else if (sample.PRED == 3) {
            return [178 / 256, 223 / 256, 186 / 256, sample.dataMask];
        } else if (sample.PRED == 4) {
            return [54 / 256, 235 / 256, 37 / 256, sample.dataMask];
        } else if (sample.PRED == 6) {
            return [243 / 256, 245 / 256, 234 / 256, sample.dataMask];
        } else if (sample.PRED == 7) {
            return [255 / 256, 247 / 256, 181 / 256, sample.dataMask];
        } else if (sample.PRED == 8) {
            return [245 / 256, 42 / 256, 6 / 256, sample.dataMask];
        } else if (sample.PRED == 9) {
            return [50 / 256, 74 / 256, 221 / 256, sample.dataMask];
        } else if (sample.PRED == 10) {
            return [140 / 256, 203 / 256, 255 / 256, sample.dataMask];
        } else if (sample.PRED == 11) {
            return [111 / 256, 124 / 256, 128 / 256, sample.dataMask];
        }
    }

    return [0, 0, 0, 0];
}