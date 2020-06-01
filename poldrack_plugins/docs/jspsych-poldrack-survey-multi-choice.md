# jspsych-poldrack-survey-multi-choice

Modified version of the original [jspsych-survey-multi-choice](http://docs.jspsych.org/plugins/jspsych-survey-multi-choice/) plugin. Very similar to the jspsych-poldrack-radio-buttonlist plugin but has more built-in HTML features (and less flexibility). Features added to the original plugin include: 

* Storing each question's data in separate rows 
* Both the text and numeric codes for the response option 
* Scored numeric data
* Progress bars
* Response rangein output 
* Include question data in output
* Back buttons

## Parameters

This table lists the parameters associated with this plugin. Parameters with a default value of *undefined* must be specified. Other parameters can be left unspecified if the default value is acceptable.

Parameter | Type | Default Value | Description
----------|------|---------------|------------
exp_id | string | "" | Name of survey that will be included in output for `exp_id`
preamble | string | "" | Text to show above each page.
required | array  | null | Should have same dimensions as pages. Values should be booleans indicating whether question is mandatory.
horizontal | boolean | false | Should response options be displayed horizontally on a single line.
pages | array | "" | Array of arrays containing questions. Should include an array for each page that contains the questions to be displayed on each page.
show_clickable_nav | boolean | true | Whether to display navigation buttons.
allow_backward | boolean | true | Whether to allow a back button to navigate to previous pages.
options | array | NA | Array with an array for each page that contains array with responses for each question (i.e. 3 dim array instead of 2 options\[current_page\]\[current_question\]\[current_option\])
scale | object | NA | Object containing how any option should be coded numerically
reverse_score | array | Array of false | Array indicating if a question should be reverse scored. Values should be booleans and the length of the array should be the number of questions.

## Data Generated

In addition to the [default data collected by all plugins](http://docs.jspsych.org/plugins/overview/#datacollectedbyplugins), this plugin collects the following data for each trial.


Name | Type | Value
-----|------|------
rt | numeric | total number of ms spent on that page
qnum | numeric | question number on a given page
page_num | numeric | page number question was presented in
trial_num | numeric | continous trial number variable
stim_question | text | text of question that participant saw
stim_response | text | text of response option participant selected
num_response | numeric | numeric value specified in `scale` parameter for the text option selected
score_response | numeric | numeric value of scored response
response_range | numeric | range of available responses
times_viewed | numeric | number of times page was viewed
view_history | js object | the last row of output containing raw js data on order of page views

## Examples

```javascript
function fillArray(value, len) {
  if (len == 0) return [];
  var a = [value];
  while (a.length * 2 <= len) a = a.concat(a);
  if (a.length < len) a = a.concat(a.slice(0, len - a.length));
  return a;
}

var opts = ["Strongly disagree", "Mostly disagree", "Somewhat disagree", "Neither agree or disagree", "Somewhat agree", "Mostly agree", "Strongly agree"]

var all_pages = [["I control my emotions by changing the way I think about the situation I am in.","When I want to feel less negative emotion, I change the way I am thinking about the situation."],["When I want to feel more positive emotion, I change the way I am thinking about the situation.","When I want to feel more positive emotion (such as joy or amusement), I change what I am thinking about.","When I want to feel less negative emotion (such as sadness or anger), I change what I am thinking about."],["When I am faced with a stressful situation, I make myself think about it in a way that helps me stay calm.","I control my emotions by not expressing them.","When I am feeling negative emotions, I make sure not to express them.","I keep my emotions to myself.","When I am feeling positive emotions, I am careful not to express them."]]

var all_options = [fillArray(opts, 2),fillArray(opts, 3), fillArray(opts, 5)]

var score_scale = {"Strongly disagree": 1, "Mostly disagree": 2, "Somewhat disagree": 3, "Neither agree or disagree": 4, "Somewhat agree": 5, "Mostly agree": 6, "Strongly agree": 7}

var survey_block = {
  type: "poldrack-survey-multi-choice",
  horizontal: true,
  preamble: "Answer the questions",
  pages: all_pages,
  options: all_options,
  scale: score_scale,
  show_clickable_nav: true,
  allow_backward: true,
  required: [fillArray(true,2),[false].concat(fillArray(true, 2)),fillArray(true, 5)],
  reverse_score: [fillArray(true,2),fillArray(false, 3),fillArray(true, 5)],
};
```