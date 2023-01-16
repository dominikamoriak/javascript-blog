'use strict';

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

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  console.log(generateTitleLinks);

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */
  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  for(let article of articles){

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element and get the title from the title element(innerHTML) */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

function generateTags(){

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
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;

  /* END LOOP: for every article: */
  }
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

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const titleList = article.querySelectorAll(optArticleAuthorSelector);
    console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* insert HTML of all the links into the authors wrapper */
    titleList.innerHTML = html;

    /* END LOOP: for each tag */
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  console.log(event);

  /* find all authors links with class active */
  const activeAuthorLinks = document.querySelector(optArticleAuthorSelector);
  console.log(activeAuthorLinks);

  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){
    console.log(activeAuthorLink);

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[post-author="','"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
    console.log(authorLink);

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
