[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7942261&assignment_repo_type=AssignmentRepo)
<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">agCLI</h3>

  <p align="center">
    A command line tool built using NodeJS to help update npm packages on github repositories.
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor">View Demo</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/issues">Report Bug</a>
    ·
    <a href="https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `dyte-submissions`, `dyte-vit-2022-AbhinavGor`, `twitter_handle`, `linkedin_username`, `gmail`, `abhinav20016`, `agCLI`, `A command line tool built using NodeJS to help update npm packages on github repositories.`

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [Commander](https://www.npmjs.com/package/commander)
* [Github API](https://docs.github.com/en)
* [octokit.js](https://github.com/octokit/octokit.js)
* [Inquirer.js](https://www.npmjs.com/package/inquirer)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To use this package, you can install it directly from npmjs.org using the package manager, npm.
### Prerequisites

You can install my npm package, [agcli](https://www.npmjs.com/package/agcli) using the following command.
* npm
  ```sh
  npm install agcli@latest -g
  ```

### Installation

You can also setup the project locally and run the commands.

1. Get a Github developer Auth key at [https://github.com/settings/tokens](https://github.com/settings/tokens).
2. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Change the name of .example.env to .env.
5. Enter your API in `.env`
   ```js
   const GITHUB_TOKEN = {ENTER YOUR Auth token};
   ```
6. Enter your github username and password in `.env` file.
    ```js
    USER_NAME={your github username}
    USER_EMAIL={email associated with your github account}
    ```
7. 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. This command checks if any of the repositories listed in the csv file have an older version of the package and version specified. The "```-update```" flag takes control of updating the specified package.
   ```sh 
   agcli -i <input_repositories_csv_file> <package_name@version> -update
   ```
   ![command-screenshot-1]
2. The command shown above can also be used without the "```-update```" flag as shown below.
   ```sh 
   agcli -i <input_repositories_csv_file> <package_name@version>
   ```
   ![command-screenshot-2]
3. If the specified version number of the package does not exist, then an error is thrown as shown below.
   ![command-screenshot-3]
4. The ```get-updates <repository_url>``` command allows users to get the latest version of all the npm packages being used in the specified github project.
   ```sh 
   agcli get-updates <repository_url>
   ```
   ![command-screenshot-4]
5. The users can then specifiy the indices of the dependencies in the table which they want to update, PRs are made to update those npm packages.
   ![command-screenshot-5]
6. Help can be accessed using the following command:
   ```sh 
   agcli --help
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Compare the version of the npm package in the project and the one specified by the user in the command and tell if the version is satisfied or not.
  - [x] Check if the version of the package specified by user actually exists for that particular npm package or not. Implemented using [pkg-versions](https://www.npmjs.com/package/pkg-versions).
- [x] If the version is not satisfied in the above step, make a PR to the repository mentioned to update the npm package to the required version.
- [x] ```get-updates``` command - Check if all the packages are up to date in a given github project and report result.
    - [ ] If the version of the packages is not the latest, ask the user which ones they want to update and make PR to update those packages.

See the [open issues](https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Abhinav Gorantla - abhinav20016@gmail.com

Project Link: [https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor](https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []() -->

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dyte-submissions/dyte-vit-2022-AbhinavGor.svg?style=for-the-badge
[contributors-url]: https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dyte-submissions/dyte-vit-2022-AbhinavGor.svg?style=for-the-badge
[forks-url]: https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/network/members
[stars-shield]: https://img.shields.io/github/stars/dyte-submissions/dyte-vit-2022-AbhinavGor.svg?style=for-the-badge
[stars-url]: https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/stargazers
[issues-shield]: https://img.shields.io/github/issues/dyte-submissions/dyte-vit-2022-AbhinavGor.svg?style=for-the-badge
[issues-url]: https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/issues
[license-shield]: https://img.shields.io/github/license/dyte-submissions/dyte-vit-2022-AbhinavGor.svg?style=for-the-badge
[license-url]: https://github.com/dyte-submissions/dyte-vit-2022-AbhinavGor/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[command-screenshot-1]: images/command_demo1.png
[command-screenshot-2]: images/command_demo2.png
[command-screenshot-3]: images/command_demo3.png
[command-screenshot-4]: images/command_demo4.png
[command-screenshot-5]: images/command_demo5.png