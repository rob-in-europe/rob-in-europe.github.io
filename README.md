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
- `page.js_libs`: a list of javascript libraries to load (defaults to []).
   - `D3`: use the (remote) D3 library.
   - `MathJax`: use the (remote) MathJax library.
- `page.navid`: if this string matches one of the links in the navigation
  bar, that link is highlighted so as to identify the page as belonging to
  that portion of the site; `page.category` is the fallback option.

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

## Posts by category

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
- `site.listed_by_cat`: if true **and** `page.category` is undefined, links to
  per-category post listings are added under post dates (defaults to "false").

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

# Document structure and CSS

The following stylesheets control the appearance of each page:

- `common.css`: defines font sizes and families, basic page layout, and the
  appearance of lists and tables.
- `print.css`: hides non-essential elements, replaces colours and highlights
  with greyscale shades and decorations, and resizes the content to fill the
  page.
- `screen_large.css`: defines the page layout for sufficiently large screens.
- `screen_small.css`: defines a compact page layout for devices with smaller
  screens.
- `solarized-dark.css`: applies the
  [Solarized](http://www.ethanschoonover.com/solarized) colour palette (dark
  version).
- `solarized-light.css`: applies the
  [Solarized](http://www.ethanschoonover.com/solarized) colour palette (light
  version).

## CSS classes

The main body of each page is contained within `div#content`, which is centred
horizontally across the page and whose width defines the horizontal space
available to the page contents and the margin columns (`.lcol` and `.rcol`,
respectively).

Column contents (`div.lcol` and `div.rcol`) typically contain a heading
(`p.colname`) and one or more links wrapped in `p.colitem` element(s).

Page blurbs (as defined in `_includes/blurb_*`) can contain links to be
displayed in columns at the top of the page, and also a blurb (`div.heading`)
that is displayed with a highlighted background and rounded corners.

Unordered lists (`ul`) have custom bullets, defined as non-repeated
backgrounds for each list item (`li`).
Ordered lists (`ol`), on the other hand, use the standard list style but are
indented so that the numbering does not escape the left-hand margin and cross
into the left-hand margin column.

Code blocks (`div.code pre`) are highlighted using span classes whose names
are taken from the Emacs font-lock attributes, as defined by the major mode
and written by `htmlize.el` (using the commands `htmlize-buffer`,
`htmlize-file` and `htmlize-region`).
The code blocks are not generated with `pygments` because, for languages such
as OCaml, `pygments` does not distinguish between various syntactical elements
while the Emacs modes (such as `tuareg`) do.

Additional CSS rules are defined to style the SVG elements of plots produced
using the `D3` javascript library, and will cause the website to fail the W3C
CSS validator's checks.
