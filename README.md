# big-presentation-arena-generate
A set of code glue to easily generate [big](https://github.com/tmcw/big/blob/gh-pages/docs/user-guide.md) presentations from <are.na> channels 

# Usage
This assumes you have [already installed big](https://github.com/tmcw/big/blob/gh-pages/docs/user-guide.md) via `npm install -g big-presentation`

Initialize your project with `big-presentation-init`
In your project's folder, run `big-presentation-arena-generate --slug=CHANNELSLUG`

#### Finding your channel slug
The channel slug is the last part of the URL on the are.na website. For example the slug for <https://www.are.na/ej-fox/neo-internet-philosophy> is `neo-internet-philosophy`

## To-do
+ Add --image-only flag to skip text only posts
+ Add generated final slide with link to are.na channel
