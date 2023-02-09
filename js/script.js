'use strict';

/* global Handlebars */

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

function titleClickHandler(event){
  event.preventDefault();

  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  console.log(targetArticle);
  targetArticle.classList.add('active');

}

function generateTitleLinks(customSelector = ''){
  console.log(generateTitleLinks);

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  console.log(customSelector);

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element and get the title from the title element(innerHTML) */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    /* insert link into titleList, HTML variable */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams (tags){

  /* create a new const params, max 0, min 999 999 */
  const params = {max:0, min:999999};
  console.log('params:', params);

  /* START LOOP: for every tag */
  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    /* check if these tags are larger than params.max */
    if(tags[tag] > params.max){
      params.max = tags[tag];

    /* check if these tags are smaller than params.min */
    } else { (tags[tag] < params.min);
      params.min = tags[tag];
    }
  }

  /* END LOOP */

  return params;
}

function calculateTagClass(count, params){

  /* create a new const with normalizedCount and subtract count from params.min */
  const normalizedCount = count - params.min;
  console.log(normalizedCount);

  /* create a new const with normalizedMax and subtract params.max from params.min */
  const normalizedMax = params.max - params.min;
  console.log(normalizedMax);

  /* create a new const percentage and split normalizedCount by normalizedMax */
  const percentage = normalizedCount / normalizedMax;
  console.log(percentage);

  /* create a new const classNumber with Math.floor */
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1 );
  console.log(classNumber);

  return optCloudClassPrefix + classNumber; // np. 'tag-size-5'
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);

      /* generate HTML of the link */
      const linkHTMLData = {tag: tag};
      console.log(linkHTMLData);
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  console.log(allTagsHTML);

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const className = calculateTagClass(allTags[tag], tagsParams);
    console.log ('className:', className);
    const linkHTML = '<li><a href="#tag-' + tag + '" class="' + className + '">' + tag + '</a></li>';
    console.log('linkHTML:', linkHTML);

    allTagsHTML += linkHTML;
    console.log(allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to taglist */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    console.log(activeTagLink);

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefTagLinks);

  /* START LOOP: for each found tag link */
  for(let hrefTagLink of hrefTagLinks){
    console.log(hrefTagLink);

    /* add class active */
    hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    console.log(tagLink);

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){

  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    console.log(titleList);

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* make html variable */
    let linkHTMLData = {author: articleAuthor};
    console.log(linkHTMLData);
    let linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    }
    /* insert HTML of all the links into the authors wrapper */
    titleList.innerHTML = linkHTML;

    /* END LOOP: for every article */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);
  console.log(authorList);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors */
  for(let author in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    const linkHTML = '<li><a href="#author-' + author + '">' + author + '</a></li>';
    console.log('linkHTML:', linkHTML);

    allAuthorsHTML += linkHTML;
    console.log(allAuthorsHTML);
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /* [NEW] add html from allAuthorsHTML to authorslist */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);

  /* find all authors links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){
    console.log(activeAuthorLink);

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
    console.log(authorLink);

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
