<template>
  <h1>This is the project list</h1>
  <div class="listwrapper">
    <ProjectEntry />


    <header role="banner">
      <nav class="nav" role="navigation">
        <ul class="nav__list">
          <li>
            <input id="group-1" type="checkbox" hidden />
            <label for="group-1"><span class="fa fa-angle-right"></span>item-1-level</label>
            <ul class="group-list">
              <li><a href="#">item-1-opt</a></li>
              <li>
                <input id="sub-group-1" type="checkbox" hidden />
                <label for="sub-group-1"><span class="fa fa-angle-right"></span> item-2-level</label>
                <ul class="sub-group-list">
                  <li><a href="#">item-1-opt-1</a></li>
                  <li><a href="#">item-1-opt-2</a></li>
                  <li><a href="#">item-1-opt-3</a></li>
                  <li>
                    <input id="sub-sub-group-1" type="checkbox" hidden />
                    <label for="sub-sub-group-1"><span class="fa fa-angle-right"></span> item-1-opt-4-level</label>
                    <ul class="sub-sub-group-list">
                      <li><a href="#">item-1-opt-4-1</a></li>
                      <li><a href="#">item-1-opt-4-2</a></li>
                      <li><a href="#">item-1-opt-4-3</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <input id="group-2" type="checkbox" hidden />
            <label for="group-2"><span class="fa fa-angle-right"></span>item-2</label>
            <ul class="group-list">
              <li>
                <li><a href="#">item-1</a></li>
                <li><a href="#">item-2</a></li>
                <input id="sub-group-2" type="checkbox" hidden />
                <label for="sub-group-2"><span class="fa fa-angle-right"></span> item-3</label>
                <ul class="sub-group-list">
                  <li><a href="#">item-3-1</a></li>
                  <li><a href="#">item-3-2</a></li>
                  <li>
                    <input id="sub-sub-group-2" type="checkbox" hidden />
                    <label for="sub-sub-group-2"><span class="fa fa-angle-right"></span> item-3-3</label>
                    <ul class="sub-sub-group-list">
                      <li><a href="#">item-3-3-1</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <input id="group-3" type="checkbox" hidden />
            <label for="group-3"><span class="fa fa-angle-right"></span>item-3-level</label>
            <ul class="group-list">
              <li>
                <li><a href="#">item-3</a></li>
                <li><a href="#">item-3-1</a></li>
                <input id="sub-group-3" type="checkbox" hidden />
                <label for="sub-group-3"><span class="fa fa-angle-right"></span> Second level</label>
                <ul class="sub-group-list">
                  <li><a href="#">2nd level nav item</a></li>
                  <li><a href="#">2nd level nav item</a></li>
                  <li><a href="#">2nd level nav item</a></li>
                  <li>
                    <input id="sub-sub-group-3" type="checkbox" hidden />
                    <label for="sub-sub-group-3"><span class="fa fa-angle-right"></span> Third level</label>
                    <ul class="sub-sub-group-list">
                      <li><a href="#">3rd level nav item</a></li>
                      <li><a href="#">3rd level nav item</a></li>
                      <li><a href="#">3rd level nav item</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <input id="group-4" type="checkbox" hidden />
            <label for="group-4"><span class="fa fa-angle-right"></span> item-4-level</label>
            <ul class="group-list">
              <li>
                <li><a href="#">1st level item</a></li>
                <input id="sub-group-4" type="checkbox" hidden />
                <label for="sub-group-4"><span class="fa fa-angle-right"></span> Second level</label>
                <ul class="sub-group-list">
                  <li><a href="#">2nd level nav item</a></li>
                  <li><a href="#">2nd level nav item</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>


  </div>
</template>
<script>

</script>
<style>

body {
  margin-top: 2rem;
  font: 100% "Open sans", "Trebuchet MS", sans-serif;
}

* {
  padding: 0;
  user-select: none;
  margin: 0;
}

a {
  text-decoration: none;
}

ol,
ul {
  list-style: none;
}

/**
 * Hidden fallback
 */
[hidden] {
  display: none;
  visibility: hidden;
}

/**
 * Styling navigation
 */
header {
  margin-right: auto;
  margin-left: auto;
  max-width: 22.5rem;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
}

/**
 * Styling top level items
 */
.nav a,
.nav label {
  display: block;
  padding: 0.85rem;
  color: #fff;
  background-color: #151515;
  box-shadow: inset 0 -1px #1d1d1d;
  transition: all 0.25s ease-in;
}
.nav a:focus, .nav a:hover,
.nav label:focus,
.nav label:hover {
  color: rgba(255, 255, 255, 0.5);
  background: #030303;
}

.nav label {
  cursor: pointer;
}

/**
 * Styling first level lists items
 */
.group-list a,
.group-list label {
  padding-left: 2rem;
  background: #252525;
  box-shadow: inset 0 -1px #373737;
}
.group-list a:focus, .group-list a:hover,
.group-list label:focus,
.group-list label:hover {
  background: #131313;
}

/**
 * Styling second level list items
 */
.sub-group-list a,
.sub-group-list label {
  padding-left: 4rem;
  background: #353535;
  box-shadow: inset 0 -1px #474747;
}
.sub-group-list a:focus, .sub-group-list a:hover,
.sub-group-list label:focus,
.sub-group-list label:hover {
  background: #232323;
}

/**
 * Styling third level list items
 */
.sub-sub-group-list a,
.sub-sub-group-list label {
  padding-left: 6rem;
  background: #454545;
  box-shadow: inset 0 -1px #575757;
}
.sub-sub-group-list a:focus, .sub-sub-group-list a:hover,
.sub-sub-group-list label:focus,
.sub-sub-group-list label:hover {
  background: #333333;
}

/**
 * Hide nested lists
 */
.group-list,
.sub-group-list,
.sub-sub-group-list {
  height: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
}

.nav__list input[type=checkbox]:checked + label + ul {
  /* reset the height when checkbox is checked */
  max-height: 1000px;
}

/**
 * Rotating chevron icon
 */
label > span {
  float: right;
  transition: transform 0.65s ease;
}

.nav__list input[type=checkbox]:checked + label > span {
  transform: rotate(90deg);
}

/**
 * Styling footer
 */
footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #050505;
}

.soc-media {
  display: flex;
  justify-content: center;
}

.soc-media li:nth-child(n+2) {
  margin-left: 1rem;
}

.soc-media a {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.65);
  transition: color 0.25s ease-in;
}
.soc-media a:focus, .soc-media a:hover {
  color: rgba(255, 255, 255, 0.2);
}

</style>
