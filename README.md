# robm-pjs

Source code for a plain jekyll-generated site.

It contains some standard Jekyll directories (`_includes` and `_layouts`).
Static files (e.g., stylesheets, images, javascript) are stored in `assets`.

The following pages are defined:

- `index.md`: list the most recent posts.
- `date/index.md`: list all posts, sorted by date.
- `tag/index.md`: list all posts, categorised by tags.

# Layouts

## Site

Every page (no matter the layout it uses) is eventually displayed using the
`site` layout, which comprises the doctype declaration, page title,
stylesheets, javascript sources, navigation bar, and footer.

The behaviour of this layout depends on the following variables:

- `page.title`: the page title; `page.category` and `site.title` are the
  fallback options (in that order).
- `page.css_theme`: the name of the stylesheet that defines the colour theme;
  `site.css_theme` is the fallback option.
- `page.extra_css`: a list of additional page-specific stylesheets, relative
  to the `assets/css` directory.
- `page.js_libs`: a list of javascript libraries to load (defaults to []).
   - `D3`: use the (remote) D3 library.
   - `MathJax`: use the (remote) MathJax library.
- `page.extra_js`: a list of additional page-specific javascript files,
  relative to the `assets/js` directory.
- `page.navid`: if this string matches one of the links in the navigation
  bar, that link is highlighted so as to identify the page as belonging to
  that portion of the site; `page.category` is the fallback option.
- `page.asides`: a list of asides (`_includes/aside_NAME`) to include.
- `page.blurb`: a blurb to display at the top of the page
  (`_includes/blurb_NAME`).

The visibility of several page elements can be controlled by the following
variables:

- `page.hide`: a list of elements that should be hidden (defaults to []).
  - `navbar`: hide the navigation bar (top of page).
  - `title`: hide the page title (top of page).
  - `footer`: hide the page footer (bottom of page).

## Post

The layout for a blog post is simple: the date is shown in the left-hand
column, under which are the post tags (if any).
Each tag is a link to the list of all blog posts with the same tag **and**
belonging to the same category.

The code to generate these links is found in `_includes/links_to_tags`.

The behaviour of this layout depends on the following variables:

- `site.show_prev_next`: determines whether to display links to the previous
  and next posts.
- `page.galleries`: a hash that maps names to URLs, each of which will be
  displayed as a link to the specified photo gallery.
- `page.license`: identifies the license under which the post is made
  available (defaults to `site.default_license`).
  See `site.licenses` in `_config.yml` for a predefined list of CC
  licenses.

Comments can be embedded in the YAML front matter:

    ---
    comments:
    - author: John Doe
      date: January 1, 2000
      text: |
        This is how you embed a comment in the YAML front matter so that it
        will be displayed at the bottom of the post.
    - author: Jane Doe
      date: January 2, 2000
      text: |
        You can even embed multiple paragraphs.</p>

        <p>Just remember that the comment text, as a whole, will be contained
        within a paragraph element. So you only need tags between paragraphs.
    ---

## Recent posts

Lists the most recent posts belonging to a single category, or across all
categories.
If there are more posts than are shown in the listing, a link is added at the
bottom of the page that points to the list of all posts sorted by date (see
below).

The behaviour of this layout depends on the following variables:

- `page.category`: if undefined (default) the most recent posts across
  **all** categories are listed; if defined, the most recent posts from that
  specific category are listed.
- `site.max_posts`: the number of posts to display.

## Posts by date

Lists all posts belonging to a single category, or across all categories,
in order from newest to oldest and categorised by month and year.

The behaviour of this layout depends on the following variables:

- `page.category`: if undefined (default) then **all** posts  are listed; if
  defined, then only posts from that specific category are listed.

## Posts by tag

Lists all posts belonging to a single category, or across all categories,
categorised by tags.

The behaviour of this layout depends on the following variables:

- `page.category`: if undefined (default) then **all** posts  are listed; if
  defined, then only posts from that specific category are listed.
