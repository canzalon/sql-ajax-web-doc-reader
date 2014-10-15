<?php

/**
 * Project: sql-ajax-web-doc-reader
 * @author Christopher Anzalone
 * File: PageServer.php
 */
 
require_once("dbinfo.php");

mysql_connect("localhost", "$myUserId", "$myPasswd") or die(mysql_error());  //connect to mysql
mysql_select_db("$myDatabase") or die(mysql_error());    //select canzalon database


 
 error_reporting(0);
 /* Check which function is being requested */
 $params = $_GET;
 if ($params["name"] != "dracula") {
   die("document \"".$params["name"]."\" not found");
 }

 switch ($params["function"])
 {
    case "info":
		$data = mysql_query("SELECT * FROM info") or die(mysql_error());
		$info = mysql_fetch_array($data);
		echo "{" . "\"name\":" . "\"" . $info['Title'] . "\""  . "," . "\"author\":" . "\"" . $info['Author'] . "\"" . "," . "\"numChapters\":" . $info['Number of Chapters'] . "}";
  //    echo "{\"name\":\"Dracula: A Mystery Story\",\"author\":\"Bram Stoker\",\"numChapters\":27}";
        break;
    case "getchapter":
        $chapter=$params["chapter"];   
        settype($chapter, "int");
  /*  	if ($chapter < 9) 
		{
			$chapter = "0".$chapter;
		}  */
    //	$chapterFile="dracula/dracula-$chapter.html";
		$chapterFile= mysql_query("SELECT chapterHtml FROM chapters WHERE chapterNum LIKE '$chapter'") or die(mysql_error());
		$chapterInfo = mysql_fetch_array($chapterFile);
	    echo $chapterInfo['chapterHtml'];
	//	$fh = fopen($chapterFile, 'r') or die("can't open chapter $chapter");  //opens url/file, and binds a named resource ($chapterFile) to a stream ($fh) 
	//	$chapter = fread($fh, filesize($chapterFile));  //reads file (up to length of particular chapter) into $chapter var
	//	fclose($fh);  //closes the file pointed at by $fh
	//	echo $chapter;   //sends back the data in $chapter (the current chapter)
        break;
    default: echo "Bad Request";
 } 
?>