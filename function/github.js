async function githubdl(url) {
    const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;
    const match = url.match(regex);

    if (!match) {
        throw new Error('Invalid url. use the format: https://github.com/username/repository');
    }

    const user = match[1];
    const repo = match[2];
    const link = `https://api.github.com/repos/${user}/${repo}/zipball`;

    return (link)
}

module.exports = { githubdl }