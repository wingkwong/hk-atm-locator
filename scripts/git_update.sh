#!/bin/sh
# Credit: https://gist.github.com/willprice/e07efd73fb7f13f917ea

setup_git() {
  git config --global user.email "travis@travis-ci.com"
  git config --global user.name "Travis CI"
}

commit_atm_files() {
  git checkout master

  # Move the data files
  if [ -f transformer/checksum/hang_seng.md5 ]; then
    cp -f transformer/processed/hang_seng.json web/src/data
  fi

  if [ -f transformer/checksum/hsbc.md5 ]; then
    cp -f transformer/processed/hsbc.json web/src/data
  fi

  if [ -f transformer/checksum/jetco_en.md5 ]; then
    cp -f transformer/processed/jetco_en.json web/src/data
  fi

  if [ -f transformer/checksum/jetco_tc.md5 ]; then
    cp -f transformer/processed/jetco_tc.json web/src/data
  fi

  git status
  # Current month and year, e.g: Apr 2018
  dateAndMonth=`date "+%b %Y"`
  # Stage the modified files in dist/output
  git add -f web/src/data/
  # Create a new commit with a custom build message
  # with "[skip ci]" to avoid a build loop
  # and Travis build number for reference
  git commit -m "Travis update processed json: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
  # Update Checksum files
  git add -f transformer/checksum/
  git commit -m "Travis update checksum files: $dateAndMonth (Build $TRAVIS_BUILD_NUMBER)" -m "[skip ci]"
}

upload_files() {
  git remote add upstream https://wingkwong:${GH_TOKEN}@github.com/wingkwong/hk-atm-locator.git > /dev/null 2>&1
  git push --quiet --set-upstream upstream master
}

setup_git

commit_atm_files

# Attempt to commit to git only if "git commit" succeeded
if [ $? -eq 0 ]; then
  echo "A new commit with changed ATM JSON files exists. Uploading to GitHub"
  upload_files
else
  echo "No changes in ATM JSON files. Nothing to do"
fi