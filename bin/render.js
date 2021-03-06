#!/usr/bin/env node

"use strict";

var path = require('path');
var renderer = require('../lib/render');

var exitCode = 0;

process.on("uncaughtException", function(err){
  console.log("\nOops! Something went wrong! :(");
  console.log(err.message);
  console.log(err.stack);

  process.exit(1);
});

var rubocopResult = process.env.FLOW_RUBOCOP_RESULT;
var rubocopResultFile = process.env.FLOW_RUBOCOP_LOG_PATH;

if (!rubocopResult && !rubocopResultFile) {
  console.log('WARNING: rubocop result json or result file is required');
  rubocopResultFile = path.join(__dirname, '../tests/rubocop_result.json');
}

var project = {
  name: process.env.FLOW_PROJECT_NAME,
  id: process.env.FLOW_PROJECT_ID
}

var event = {
  number: process.env.FLOW_EVENT_NUMBER,
  id: process.env.FLOW_EVENT_ID
}

var job = {
  id: process.env.FLOW_JOB_ID
}

renderer({
  project: project,

  event: event,

  job: job,

  template: path.join(__dirname, '../lib/templates/layout.jade'),

  rubocopResult: rubocopResult,

  rubocopResultFile: rubocopResultFile

});

process.exit(exitCode);
