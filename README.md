# airbnb-reservation-scraper-chrome-extension
Chrome extension that copies tab delimited metadata about a reservation into clipboard.

###To use:

1. Install as Chrome Extension
  - Open Chrome
  - go to chrome://extensions
  - "click load unpacked extension"
  - select the folder of this repo

2. Load a reservation
  - Login to Airbnb host account in Chrome
  - Account Settings > Transaction History
  - Click a reservation which will load a page like "https://www.airbnb.com/reservation/itinerary?code=ABCDEF"
  - The chrome extension automatically detects the URL pattern and moves data into the clipboard

These are the fields that get extracted:

> Check In Date	Check In MonthYear	Check out date	Number of nights	Number of guests	Nightly Payout	Nightly fee times num nights	Cleaning Fees	Airbnb Fee	Total Payout	Security Deposit	Property	Guest Name	Reservation Code	Phone Number	

These fields for my account sometimes do not exist so there is special code to work around that:

> Cleaning Fee

> Security Deposit

> Phone Number

Note: Phone Number will never exist after a guest has checked out + 24 hours, it becomes hidden

> MonthYear 

is a generated field I use for spreadsheet manipulation to do monthly metrics.  

##Typical Usage

I open a spreadsheet with the fields above as a header.  I go to my transaction history.  I command click reservations opening them in new tabs and loading the clipboard.  I go to spreadsheet.  I paste in a new row from clipboard.  I close opened reservation tab.  I command click a new reservation and continue.

