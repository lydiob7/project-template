function parsePath(uri = '') {
    return `${process.env.PUBLIC_URL}${uri}`;
}

const parseSeconds = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor((time / (60 * 60)) % 24);

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
    }`;
};

const mantainancePath = '/mantainance';

export { mantainancePath, parsePath, parseSeconds };
