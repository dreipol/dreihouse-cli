# dreihouse-cli

Dreihouse is a tool to run automated lighthouse audits for a webproject. Dreihouse has the advantage
to be more configurable than lighthouse.

# Install

    npm i dreihouse-cli -g


# Commands
    
### `audit <url> <dir>`
This command, launches a headless chrome instance and will run a small set of audits on the given url whenever a file
in the given folder changes.

### `setup <dir>`
The setup command will setup the default configuration files in the folder specified in the command.
After setup you have to edit the config to your flavours.

### `report <URL> [--config-file ./config/desktop.js] --reporter [REPORTER]`

        dreihouse report https://example.ch -f ./config/desktop.js -r cli
        


To create a report you have to call this command followed by the config file that holds the configuration
for `dreihouse`. Alternately you can run an audit with a default config by leaving your the config file option.

        dreihouse report https://example.ch -r cli

**list of available reporters**
- `cli` Print lighthouse results in CLI
- `json` Store the whole LH report as JSON
- `json-dashboard` save just `lighthouse-dashboard` specific data
- `html` save the LH report for further inspections



#### Flags
| name             | optional | default  | example                       | description                                         |
| ---------------- | -------- | -------- | ----------------------------- | --------------------------------------------------- |
| `-r, --reporter` | `false`  |          | cli,html,json,json-dashboard | Add list of repprters to handle the data. Available |
| `-f, --config-file`| `true`   |[./config/base.js](./config/base.js)      | `./config/lh.desktop.js` | Define the config file|
| `-p, --port`         | `true`   |   9222   |                               | Debugging port of a running chrome instance         |
| `-v, --verbose`         | `true`   | false     |                               | Verbose console output   |
| `-s, --silent`         | `true`   | false     |                               | Suppress spinner on CLI|


## Circle CI Config

Example config file: 

    version: 2
    jobs:
      build:
        docker:
          - image: circleci/node:8.9-browsers
        working_directory: ~/repo
        steps:
          
          - checkout
          
          - restore_cache:
              keys:
              - v1-npm-dependencies-{{ checksum "package.json" }}
          
          - run:
              name: install
              command: |
                npm i
          
          - run:
              name: install dreihouse
              command: |
                npm i @dreipol/lighthouse-audits
                npm i @dreipol/lighthouse-config
                npm i @dreipol/dreihouse
          
          - save_cache:
              paths:
                -  ~/repo/node_modules
              key: v1-npm-dependencies-{{ checksum "package.json" }}
          
          - run:
              name: run report
              command: |
                npx dreihouse report https://example.com -f ./lighthouse/lh.desktop.js -r cli,html
                npx dreihouse report https://example.com -f ./lighthouse/lh.mobile.js -r cli
          
          - store_artifacts:
              path: ~/repo/reports
              destination: lighthouse
