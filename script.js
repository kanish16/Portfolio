const terminal = document.getElementById("terminal");

const AVAILABLE_COMMANDS = [
    "ls",
    "skills",
    "projects",
    "about",
    "contact",
    "clear",
];

function waitForInput(inputElement) {
    return new Promise((resolve) => {
        inputElement.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                resolve(inputElement.value);
            }
        });
    });
}

function autocomplete(inputElement) {
    let currentInput = "";

    inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            e.preventDefault();

            currentInput = inputElement.value.toLowerCase();
            if (currentInput) {
                const matches = AVAILABLE_COMMANDS.filter((cmd) =>
                    cmd.toLowerCase().startsWith(currentInput)
                );

                if (matches.length === 1) {
                    inputElement.value = matches[0];
                } else if (matches.length > 1) {
                    const outputElement = document.createElement("pre");
                    outputElement.classList.add("jt-medium", "terminal-output");
                    outputElement.textContent = "\n" + matches.join("  ");
                    terminal.appendChild(outputElement);
                }
            }
        }
    });
}

async function generateInputAndOuput() {
    const infoElement = document.createElement("p");
    infoElement.classList.add("jt-medium", "terminal-output");
    infoElement.textContent =
        "Enter ls to start exploring the portfolio... (Use Tab for autocomplete)";
    terminal.appendChild(infoElement);

    let userInput = "";
    while (true) {
        const inputElement = document.createElement("input");
        const inputLabel = document.createElement("label");

        inputElement.classList.add("jt-medium", "terminal-input");
        inputElement.setAttribute("autofocus", "true");
        inputElement.name = "inputElement";

        inputLabel.classList.add("jt-medium", "terminal-label");
        inputLabel.setAttribute("for", "inputElement");
        inputLabel.textContent = "-> ";

        terminal.appendChild(inputLabel);
        terminal.appendChild(inputElement);

        autocomplete(inputElement);

        inputElement.focus();

        userInput = await waitForInput(inputElement);
        inputElement.setAttribute("disabled", "true");

        const command = userInput.split(" ")[0];
        const outputElement = document.createElement("pre");
        outputElement.classList.add("jt-medium", "terminal-output");
        if (commands[command]) {
            commands[command](outputElement);
        } else {
            outputElement.textContent = "Command not found";
            terminal.appendChild(outputElement);
        }
    }
}

const commands = {
    ls: (outputElement) => {
        outputElement.textContent =
            "skills\t\t-> discover the building blocks of my craft\nprojects\t-> dive into the world of my creations\nabout\t\t-> get to know the mind behind the code\ncontact\t\t-> let's connect and collaborate\nclear\t\t-> to clear the terminal\n";
        terminal.appendChild(outputElement);
    },
    contact: (outputElement) => {
        outputElement.textContent =
            "email\t\t-> kanishm887@gmail.com\nlinkedin\t-> ";

        const linkedinLink = document.createElement("a");
        linkedinLink.href =
            "https://www.linkedin.com/in/kanishkar-m-572335327/";
        linkedinLink.textContent =
            "https://www.linkedin.com/in/kanishkar-m-572335327/";
        linkedinLink.target = "_blank";

        outputElement.appendChild(linkedinLink);
        terminal.appendChild(outputElement);
    },
    skills: (outputElement) => {
        outputElement.textContent =
            "PROGRAMMING LANGUAGES\n---------------------\nProficient in\t-> Java C SQL\nFamiliar with\t-> Javascript Python\n\nCORE\n----\nProficient in\t-> OOPS\nProficient in\t-> commonly used Data Structures and Algorithms\nFamiliar with\t-> basic Networking\n\nTOOLS\n-----\nFamiliar with\t-> Git and Github\nFamiliar with\t-> React, Spring, Express, MYSQL\n(Basic understanding of how these frameworks/libraries work and their use in web development)\nFamiliar with\t-> Basic Linux usage\n(command line, file management, basic administration)\nFamiliar with\t-> Basic Docker\n\nLeetcode\t-> ";

        const leetcodeLink = document.createElement("a");
        leetcodeLink.href = "https://leetcode.com/u/KANISHKAR_16/";
        leetcodeLink.textContent = "https://leetcode.com/u/KANISHKAR_16/";
        leetcodeLink.target = "_blank";
        outputElement.appendChild(leetcodeLink);
        terminal.appendChild(outputElement);
    },
    projects: (outputElement) => {
        outputElement.textContent =
            "PROJECTS\n" +
            "--------\n" +
            "Students-CRUD\n-> A simple CRUD application with Spring Boot, JPA, PostgreSQL, and Docker, designed to demonstrate RESTful API development and database interaction.\n" +
            "One-Stop App for College Information & Engagement\n-> A web app built with React, Express, and MySQL, consolidating college information and improving student engagement in campus activities.\n\nGithub\t\t-> ";
        const githubLink = document.createElement("a");
        githubLink.href = "https://github.com/kanish16";
        githubLink.textContent = "https://github.com/kanish16";
        githubLink.target = "_blank";
        outputElement.appendChild(githubLink);
        terminal.appendChild(outputElement);
    },
    about: (outputElement) => {
        outputElement.textContent =
            "-> I wish to work in backend development — it's where I feel most at home.\n-> I have a soft spot for type-safe languages because they keep my code clean, reliable, and bug-free (well, mostly).\n-> I'm a fast learner for requirement. I love challenges that push me to level up and get better. I'm always open to fresh ideas, feedback, and a good dose of creative thinking because that's how we grow and keep things exciting!";
        terminal.appendChild(outputElement);
    },
    clear: () => {
        terminal.innerHTML = "";
    },
};