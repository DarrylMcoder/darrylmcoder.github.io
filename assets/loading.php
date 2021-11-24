<!DOCTYPE html>
<html>
  <head>
      <meta name="viewport" content="width=320, initial-scale=1">
    <meta charset="utf-8">
    <style>
      body, html {
        min-width: 100%;
        min-height: 100%;
        margin: 0;
        padding: 0;
        font: Arial 14px;
      }
      
      #mainitem{
        background-color: white;
        border-radius:50px;
        color:black;
        vertical-align:center;
      }
    </style>
   <link rel="stylesheet" href="http://static.darrylmcoder.epizy.com/assets/style.css"/>
    <script defer src="http://static.darrylmcoder.epizy.com/assets/script.js"></script>
  </head>
  <body> <?php 
   echo file_get_contents( "http://static.darrylmcoder.epizy.com/assets/header.html" ); ?>
    <div class="content">
      <img src="http://static.darrylmcoder.epizy.com/images/spinner.gif" alt="Loading..." width="100%">
    <?php echo file_get_contents( "http://static.darrylmcoder.epizy.com/assets/footer.html" ); ?> </div>
  </body>
</html>