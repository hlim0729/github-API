'use strict';

function getUserRepos(username) {
  // dynamically generate the URL
  const url = `https://api.github.com/users/${username}/repos`;
  // we'll use a header to be explicit about which API version to use   
  const options = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"
    })// Dont understand this part. 
  };

  console.log(`Searching for repos for ${username}`);
  
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  
  // if there are previous results, remove them 
  $("#repo-list").empty();

  // for each repo listed, add a link to it in DOM  
  responseJson.forEach(obj =>
    $("#repo-list").append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  );
  // set the username equal to the search value
  $("#username").text(`${username}`);

  // display the results section
  $("#results").removeClass("hidden");
}

// be on the lookout for form submissions. when they happen,
// get the username, and call `getGitHubRepos` with it
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const username = $("#js-github-handle").val();
    getUserRepos(username);
  });
}

$(watchForm);