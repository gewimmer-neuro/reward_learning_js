/**
 * jspsych-writing
 * Ian Eisenberg
 *
 * plugin for writing text
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["writing"] = (function() {

  var plugin = {};


  plugin.trial = function(display_element, trial) {

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);

    // set default values for the parameters
    trial.text_class = trial.text_class || 'jspsych-writing-box'
    trial.choices = trial.choices || [];
    trial.response_ends_trial = (typeof trial.response_ends_trial == 'undefined') ? true : trial.response_ends_trial;
    trial.is_html = (typeof trial.is_html == 'undefined') ? false : trial.is_html;
    trial.prompt = trial.prompt || "";

    // this array holds handlers from setTimeout calls
    // that need to be cleared if the trial ends early
    var setTimeoutHandlers = [];

    // display text area the first time this plugin is called in a series
    var myElem = document.getElementById('jspsych-writing-box');
    if (myElem === null) {
      display_element.append($('<textarea>', {
        "id": 'jspsych-writing-box',
        "class": trial.text_class
      }));
      $("#jspsych-writing-box").focus()
      $('#jspsych-writing-box').height('41em');
    }

    //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

    // store response
    var response = {
      rt: -1,
      key: -1
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      for (var i = 0; i < setTimeoutHandlers.length; i++) {
        clearTimeout(setTimeoutHandlers[i]);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
        "previous_text": response.previous_text
      };

      //jsPsych.data.write(trial_data);
      $("#jspsych-writing-box").unbind()
      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      // only record the first response
      if (response.key == -1) {
        response = info;
        // append text that was on screen before keystroke
        response.previous_text = $('#jspsych-writing-box').val()
      }
      var text_length = $('#jspsych-writing-box').val().split("\n").length
      $('#jspsych-writing-box').height(text_length + 40 + 'em');
    

      if (trial.response_ends_trial) {
        end_trial();
      }
    };


    // start the response listener
    if (JSON.stringify(trial.choices) != JSON.stringify(["none"])) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }

    $("#jspsych-writing-box").on('focusout', function() {
      alert('Please write for the full time! Disable this alert if you really need to leave this page.')
      setTimeout(function() {$("#jspsych-writing-box").focus()}, 1);
    });
  }
                            
  return plugin;
})();