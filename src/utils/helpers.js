export function parsePath(uri = '') {
    return `${process.env.PUBLIC_URL}${uri}`;
}
