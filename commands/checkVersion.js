
export default (packageVersion, requiredVersion) => {
    const packageVersionparts = packageVersion.split('.');
    const requiredVersionparts = requiredVersion.split('.');

    for (var i = 0; i < packageVersionparts.length; ++i) {
        if (requiredVersionparts.length == i) {
            return true;
        }

        if (packageVersionparts[i] == requiredVersionparts[i]) {
            continue;
        }
        else if (packageVersionparts[i] > requiredVersionparts[i]) {
            return true;
        }
        else {
            return false;
        }
    }

    if (packageVersionparts.length != requiredVersionparts.length) {
        return false;
    }

    return true;
}
