Technical Sync-Up - Data Sciences
More options

Salman Khan
May 15 at 4:00 pm
32 min

27 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Template:
General
Overview
More options
During the technical sync-up for the Data Sciences project, participants discussed various issues and progress. Key points included the need to randomize job hours to avoid data redundancy, the importance of training multiple models and evaluating them based on metrics, and the use of specific APIs like OpenWeather and OpenMeteo. The team was advised to ensure their GitHub Actions pipelines run efficiently and to document their thought processes clearly in their reports. Specific questions addressed were API usage, model training, and handling data imbalance. The session emphasized the importance of monitoring pipelines and preparing for the final submission, which should include reports, pipelines, and front-end deployments.


Bullet point

Numbered list

Longer


Action Items
More options
This list can be reordered. To drag an action item, press space or enter on the drag handle. Use the up and down arrow keys to move the action item. To drop the item, press space or enter again. To cancel drag and drop, press escape.


Use the OpenMeteo API to obtain both historical and current weather and pollutant data for the project.







Use the current API key and correct parameters for the weather API, and compare the model’s AQI predictions against the official AQI values to validate the results.







Create a concise markdown or PDF report that clearly documents the project journey, including the thought process, key findings, main visualizations, and how major blockers were resolved, suitable for evaluation.







Include relevant diagrams and visualizations in the report to illustrate relationships and patterns discovered during EDA.







If the project is completed early, monitor the GitHub Actions pipeline regularly and ensure all runs are green, investigating and fixing any failures promptly.







Follow up with the cohort shortly after the meeting to address the Discord requests and questions that were not covered during the session.







Update the GitHub Actions cron job configuration so that the data fetching pipeline runs every few hours (e.g., every 4–5 hours) instead of every hour, and add checks to detect and handle duplicate or repeated data from the API.







Push the updated data fetching and model training pipeline code to GitHub and keep it under version control.







Separate the data pipeline into two scripts: one for fetching data from the API and one for training the model, and ensure they are correctly integrated into the GitHub Actions workflow.







Create a concise markdown or PDF report that clearly documents the project journey, including the thought process, key findings, main visualizations, and how major blockers were resolved, suitable for evaluation.







Use only one weather API (e.g., OpenWeather or another) for the project instead of multiple APIs, and avoid using FastAPI unless it is clearly needed for the data science workflow.







Train multiple models in the training pipeline, compare their metrics, and programmatically select the best-performing model for predictions instead of hardcoding a single model.







Use a stable Python version (such as 3.11 or 3.12) and a virtual environment to resolve the OpenMeteo library installation error, instead of using the latest Python version.







Use the OpenMeteo API to obtain both historical and current weather and pollutant data for the project.







Implement a dashboard that shows next-day, day-after-tomorrow, and third-day AQI predictions, rather than hourly predictions.







Ensure the final project repository includes the markdown or PDF report, the training and fetching pipelines, the EDA script, and a link to the deployed frontend.






Add action item

Outline
More options
Project Progress and Issues


•
Speaker 1 welcomes everyone to the Shine session and advises participants to inform the recruiter if they cannot attend due to finals.


•
Speaker 2 mentions the feature pipeline starting with Pass.


•
Speaker 3 discusses the issue with the Cronje job configuration, where the same data is fetched every hour.


•
Speaker 3 suggests randomizing the hours for the job and adding checks to handle data patterns.


GitHub and Model Training


•
Speaker 3 advises Speaker 2 to push updates to GitHub and ensure tracking.


•
Speaker 3 and Speaker 4 discuss the use of YAML files and separate scripts for data fetching and model training.


•
Speaker 3 emphasizes the importance of including the thought process in the report, not just the final findings.


•
Speaker 5 asks about the inclusion of visualizations and charts in the report.


API Usage and Prediction Models


•
Speaker 6 inquires about using both OpenWeather API and another API for the project.


•
Speaker 3 advises using one API for consistency and suggests using FastAPI for backend development.


•
Speaker 6 asks about the use of FastAPI and its integration with the UI.


•
Speaker 3 explains that FastAPI is optional but can be used for improvements.


Model Selection and Training


•
Speaker 7 asks if they can use only the best-performing model in the training pipeline.


•
Speaker 3 advises training multiple models and selecting the best based on metrics.


•
Speaker 3 discusses the importance of showing the thought process in the report.


•
Speaker 7 thanks Speaker 3 for the clarification.


Development Tools and Compatibility


•
Maryam Naseem asks if they can use Visual Studio for development and Jupyter Notebook for the training pipeline.


•
Speaker 3 confirms that it is acceptable to use different tools for different parts of the project.


•
Maryam Naseem asks about integrating pickle files in the GitHub Actions pipeline.


•
Speaker 3 advises ensuring the model is properly shipped and integrated.


API and Version Errors


•
Speaker 8 asks about using OpenWeather API and mentions a version error with the package.


•
Speaker 3 suggests creating a virtual environment and downgrading the Python version to resolve the issue.


•
Speaker 8 confirms the use of the latest Python version and mentions a compatibility issue.


•
Speaker 3 recommends using Python 3.12.8 for better stability.


Prediction and Feature Pipeline


•
Speaker 3 advises running the GitHub Actions pipeline every four to five hours to avoid redundancy.


•
Speaker 3 discusses the importance of monitoring the GitHub Actions pipeline for proper functioning.


•
Speaker 3 emphasizes the need for good progress and proper monitoring of the project.


•
Speaker 3 mentions the session will end early due to another meeting.


Documentation and Reporting


•
Speaker 4 asks about the requirements for the final submission, including documentation and video reports.


•
Speaker 3 advises making the documentation concise and focused on the project journey, blockers, and resolutions.


•
Speaker 4 thanks Speaker 3 for the guidance.


•
Speaker 3 emphasizes the importance of clear and concise documentation.


Data Imbalance and Feature Importance


•
Speaker 9 asks about the inclusion of different diagrams in the report.


•
Speaker 3 advises focusing on visualizations and relationships in the EDA.


•
Speaker 3 discusses the issue of data imbalance and suggests using feature importance to discard less relevant features.


•
Speaker 3 advises targeting the data range for better model performance.


Final Questions and Clarifications


•
Speaker 5 asks about the evaluation process and feedback from the supervisor.


•
Speaker 3 mentions that feedback will be provided through Discord and the discord teams.


•
Speaker 5 asks about the use of specific ranges for model evaluation.


•
Speaker 3 advises using different metrics for different ranges to evaluate model performance.



Technical Sync-Up - Data Sciences
More options

Salman Khan
May 15 at 4:00 pm
32 min

27 screenshots

copy summary
 Shared with: 10p
Summary
Transcript

Edit Transcript
Keywords
Data pipeline, GitHub Actions, API usage, model training, feature store, EDA (Exploratory Data Analysis), prediction accuracy, data fetching, visualization, project monitoring, Python version, feature importance, data imbalance, project documentation.
Speakers
Speaker 1 (45%), Speaker 2 (23%), u2023342 (8%), Maryam (3%), Speaker 3 (3%), Speaker 4 (3%), Speaker 5 (2%), Speaker 6 (2%), Speaker 7 (2%), zainab (2%), Muhammad (2%), Speaker 8 (1%), shoaib (1%), Muhammad (1%), Speaker 9 (1%)
Let's wait a few minutes, so everyone joins the Okay, welcome to this week's Shine session during this time you got you guys can join, so once again, if anyone has finals next week or for some reason, you guys can join. The normal protocol is to email the recruiter who's in contact with you and let them know that you will not make the session for the week, I would recommend, and working on the project, try to wrap it up, because I think anybody want to share the progress with the project, any common issues that they've been facing, any blockers that they've had,
so feature pipeline starting with Pass,
and that's unintended, right?
So Cronje job configuration many to budget You project is the first five six hours every hour they were getting the same data from the API, whichever API you were using, the solution is correct, four five hours training hours an issue I Up notice this thing. This is a problem. Can set up running every hour for the hour
update
again
Yeah, okay, that may, that makes sense. So, what I would say is, click, can you have to randomize hours, my job, the fetching pipeline, those may just make sure pretend and data bar pattern, if you just told me, so just try to add checks for that, and it's like a problems, so try to try to work around those, okay?
Yes, or second case
You have to push that to GitHub, whatever is best for you, but make sure UpTrack.
YAML file file,
yep, yep, separate script to go on here once for the fetching the data, and the second is for training the model for models in your cases,
right?
Yes, yes, and Ali, do you have a question?
Yeah. Am I audible, sir? Sir, basically merit question is okay. Nie aka videos key wo, per decade substania mat web overall day ke prediction only je ali based on jay.
Could you repeat that, please?
A particular day, key overall day, key value based on it.
Yeah, particular day, key. Yes, Harry Samant,
sir. Am I audible?
Yes, you're audible.
Okay, so in terms of report, maybe recently he finances clear wound to Abhi that many safe jo data pipeline a wo banana or hops worker feature store setup correct to inshaless ke backfill data and stuff may continue kunga Mirai savalta k Jo re report ham a banana scandar jo hum eda kar ray ke matlab humi karen jo bhi data main hamari findings amodal alien to
yan try to only include the main findings but job up PDA curriculum, usually what I like to see is kept thought processes may visible, so even other somewhat non-technical progress may visualization, then charts that it shows your clear thinking process, raw data, how you extracted meaningful things from it, because once again, Saran key valuations many karanga with different associates have ob valuations kar rangy, and they will have zero idea about the project. So, in that case, agar ap ko ed shoga, they'll they're probably visualizations, they think they're gonna realize, okay, this guy, the thought process you had was from getting from point a to point b was like this, and that will definitely raise a good project of pressure on the ETA, so ETA is very important, and just go try to show your, your thought process in that step.
Okay. Thank you, sir.
Okay. Yep. Yes. Muhammad, I You have a question. You're not audible. Maybe you can reconnect or try to figure that out. Yes, you're audible.
Okay, so I want to ask, can I use API sign and open whether API to my project. Both, I want to do both
API.
Yeah, give us towards the country. Could you clarify API?
I want to ask, can I use both API CN and Open Weather API to my project?
You can, but it's not really required. If you take up same data, get Korean, so just try using one API,
okay? And another thing I want to ask, is it feel like only refinement okay, or should I use five
API as well? But you, what do you mean?
I'm asking, is it feel like only refinement okay, or should I use fast API as well,
yeah, up go back and separately, so try using fast API as well, but honestly, this is a data science project, so I won't be really judging code separate back and front end of psychic, so there's not really hard requirement, but improvement, then you can definitely use fast API separately, and then you stream it on the UI side.
Another thing is, for 72 hour prediction, I should do the feature value forecast.
It's up to you, matter 72 hour prediction, because it's the main thing is coffee log on the hourly granularity predictions per hour for show, and that is good for separately, show cars at them, but when, when I'm looking for evaluations, I just like to seek a next day, the day after that, and the third day, yeah, you can. Yeah, one second.
Okay, Fatia Maham, your question? so
I wanted to ask that EDA and I tried multiple models and I saw that which model performed the best, so at this point I have decided that this is the best model performing, so in the training pipeline instead of training multiple models in that pipeline. I already know that this model is performing best. So, can I put just one model there and train
it?
No, I'd sit still. Try to under your training steps, still try to train multiple models and towards the deterministic, where you're actually looking at the metrics of each model trained and fast up decide it's all right up nap na its step baby, but in the future data and different correlations of the data, so maybe you never know, so in your training step try to train multiple models and wahape just have a condition based on based on the metrics, which model the best.
Okay, so
thank you,
Saddle Basit
Mobeen. Can I ask the question?
Yeah, sure, you can ask.
So it is according to the previous question. Let's suppose if I'm training three models in total, right? Best output here. I will be showing that on the dashboard, right?
Yeah,
this is what you mean. The ecosystems I wanted to ask development, is it necessary? PCP, like, if I'm using whatever tool, like what if I'm using Visual Studio, the main development Visual Studio, can I opt for collab? Yeah, Jupyter Notebook on the training pipeline is for you now. And
then I have freedom, you can do that. Just make sure, obviously, collapsed download, and that's, and then you're using through the GitHub Actions pipeline as well,
may direct use to integrate file modern PKL file. Then I will be using that.
Okay, just make sure up model resist shipping corporate coaching and your project. Yep. Yes, sure.
Thank you.
Yeah,
just
actually I'm in office, so many believe
you should have communicated that before. Ideally, try to stick around till 430 or 425 because randomly we spend attendance, so this session is also supposed to be ended a bit early, Basit question, sir.
I have a couple of questions. First, that can I use Open Mateo API, because there is both the there is historical data available, and the current data available, also for pollutants, as well as the weather. And another question is that when I'm trying to download the ops work library using pipe pip install, it's giving an error, version error, some kind of that. So, how can I solve that?
What is giving me the version error,
sir? I think there is compatibility issue with my current Python version, which is the latest, and the housework version, which I'm trying to download.
Okay, that's a
common, that's a common issue. Yeah, let me, let me ask you something. Virtual environment use?
Yes, sir, I'm using that.
Okay, so try, you can create a virtual environment, and, of course, maybe issue are then I would recommend Python core version update character. This is a common issue to previous instance
using the latest version, and when I tried to use, I asked from plot, there it shows that the current version is not supporting the Hops work version. Latest version,
you don't really have to use the latest version of Python as well. You can, you can downgrade even for certain client project projects here at Temples. Maybe recommend Python. Do not use the latest version. Compatibility issues, I think you can use three point 12.8 You might not face much issues. It's quite stable.
I want to say discuss solution many three point 1110 minutes.
Okay, yeah. Then you can try the solution that
open meteor of, can I use that?
Yeah, you can use open material, no issue on that. Okay. Thank you.
Okay. Thank
you, Mohammad Affan Mushahid.
Can I Me, GitHub Actions, may instead of every hour up five six hours.
Yeah, so when you're creating the pipeline and a graph per hour data fetch, you might notice some redundancy in the in the data that you're fetching from the API same data barber to grab same data barber upload curriculum in your feature store trending, obviously there are issues which can arise data leakage or fitting issues, so what people did was instead of running their pipeline every hours, who up the knee pipeline after four or five hours, run corrected to fetch only the latest
 and and the newest data from the APIs. So one solution for your issues can be the same thing, instead of running every hour, you can run after x amount of hours, where you know up close up the latest data, and quick previous job now ready data push card here to your feature store one. Coach APIs not with every API, I'm not sure. Open media, so documentation with quite your guess, yeah. you 2023342
Yes, sir, I do have a question. I wanted to ask that basically my model is not making Ali predictions, and this is by design, basically. So, me, a model here, particularly k 3pm It's basically averaging out the hourly data that I am fetching through the API. I wanted to know if that would suffice.
Yeah, that suffices innovation. Yeah, also Japan, my dashboard for the next three deviations. I'm not looking for hourly predictions. I'm just looking for day one, day two, day three predictions. So that's all right.
All right, that makes sense. And one more thing, I wanted to ask that basically Jo feature pipeline, it is running every one hour through GitHub actions. I mean, GitHub schedule, and it doesn't actually run every one hour, it has slight latency to it, but I wanted to ask that every single time my pipeline runs, I'm not like fetching all the historical data that I need for my model. I've basically ran the backfill for the historical data just once to populate my features on Oxford and best API use recent hourly data, so I wanted to know if that works as well.
Yeah, yeah, that's the correct approach to do it
all right. That's all I wanted to ask.
Thank you. Thank you. Yes, Muhammad Thaki City. Yep,
different API use same parameters specific value changes
different APIs use.
Open weather to key values different,
yeah. And that's why I was saying use current your data set job an audience, your data use current a key a key API use correct, and when you're comparing your results and output check, then we'll see API next day predictions update just to compare if the AQ is correct or not. Okay.
Thank you
once again. I'm iterating. I think you guys have only four weeks left, so this point that I do see good progress from you guys. You should be moving towards the actions pipeline, and if you're done a bit early, it's important to always monitor your project. So, when the monitoring part comes from checking your GitHub Actions pipeline, always seeing basically, whenever you're seeing your GitHub actions, it should be all green. You get up evaluate school, can you think of why did this fail? Why did this not fail? If he's seeing all green check marks, and he sees one red cross, so they will think that these guys haven't been monitoring their pipeline properly. Edge case towards yoga, so it leaves a bad impression. So, if you're done already, just try to monitor your pipelines, make sure everything's working as intended. Apart from that, great progress from you all. This session was intended to end at 430 because I have another meeting flash here at 10 Press, so I can answer them. Apart from that, I'm sorry. Up long, get Discord from the both requests and questions. I did not have a chance to move towards them because I was a bit occupied with work. So, I will get back to you guys a few minutes later for that. Okay. Looks like
requirement file menu final submission detailed documentation markdown file word video report one again.
Yeah, that's up to you. Markdown and well aware project there to AI, and it can generate a markdown for a file for you. What's my question? Just make sure you're verifying the file yourself, and this may the length of the file really doesn't matter to me. So just try to make it concise and to the point. What's file me? The main things we're looking for is you guide us to towards your journey, how did you get, how did you plan the project, how did you move from point a to point b, and what were the biggest blockers for you, and how you resolved them? So those are the three, four main things that I look for in the in the markdown file, in the in the pdf report.
Okay. Thank you.
Yes, if San Nadee
diagrams different diagrams
as such, it's not that type of project use case diagrams, but in terms of visualizations, when you're doing EDA up relationships to different things plots.
Okay. Thank you, sir.
Yes, Zen Ab Nadeem. Yes, your audible,
sir. Merido questions here. Number one is Khan, quizzes up the quarter Pshine you already, and I have checked the portal from past last week for every day, and second issue submission. What should be included in our repository that we are going to submit, like report on each other and Python script files, and read me files. That's it,
three four things. First of all, yes, report the pipelines, the community they're incorporated somewhere in there. Thirdly, your training fetching EDA, EDA file that should be there. One more thing, front end deploy, which I do recommend everyone to do, so keep the link should be incorporated somewhere.
All right. Thank you, sir. Kindly solve the issue of the quizzes.
Yeah, regarding quizzes, if if questions are, and that it's not visible, then at the end of the day we might just discard the quizzes.
So, you will yeah,
yeah, so I would say don't worry about the quizzes, it's under my control, and I can see Kashmiring questions are on the UI side, so we'll probably end up discarding those for this cohort, yes, Ramin Zera, I Okay, question, yes, you to zero to up, can register. Okay,
so the question that I had was that basically data API set of edge care, and they can, a lot of the data is just similarly valued method. There's not a lot of variation in the amount of pollutants, or get a unless specific event occur. So training data values, coffee eight specific range, so let's say normal range AQI values at least 80 to 90% data on values indicate, and so for events that you know maybe signify some higher or very lower values for AQI or pollutants, so almost imbalance guide muscle. I wanted to ask you, how can we cater to this? Okay, it's not as if this is like live data that we're using. So, how would I go about that?
Yeah, so it's a common thing, live data, whenever you're fetching, it's never really clean, as my coffee variances. Okay, I would say, did you try to do shop analysis in your project at all? Basically, okay, yeah, so what you need to do is try to look at feature importance, and this feature importance thing, you can probably discard those, and it's common coffee. Donkey issues are thinking there is not much range difference. Also, one small thing for Joby open weather ka use API. The values for those are one to five class classes, and coffee to city house may a key very probably barbar repeat audio, the so it's, it's a common thing, live projects, there's nothing really can do much about that, basically just knock out data, just target data, we have trained current, and the output will be like those as well, there's not much you can do,