# Check if someone is trying to run this script from the scirpts directory
if [  -d "../../Meower.js" ]; then
    cd ..
fi


if [ ! -d "../Meower.js" ]; then
    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
    echo "┃ ERROR:                                              ┃"
    echo "┃     Meower.js needs to be in the parent directory   ┃"
    echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"

    exit 1
fi


pnpm --version > /dev/null 2>&1
if [  $? -ne 0 ]; then
    echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━┓"
    echo "┃ ERROR:                  ┃"
    echo "┃  pnpm is not installed  ┃"
    echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━┛"

    exit 1
fi

example="$(pwd)"

rm -rf meower-media-meower-*.tgz

cd ../Meower.js

pnpm install

pnpm pack

cp meower-media-meower-*.tgz $example

cd $example

rm -rf node_modules/@meower-media/meower
npm install ./meower-media-meower-*.tgz

echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃ Meower.js Installed from source   ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"