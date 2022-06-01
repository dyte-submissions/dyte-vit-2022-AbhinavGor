import packageJson from "package-json";
import pkg from "pkg-versions";

export default async (packageName) => {
    // const details = await packageJson(packageName, {fullMetadata: true, allVersions: true});

    // console.log(details);
    const versions = await pkg(packageName);

    return versions;
}