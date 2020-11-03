<?php
$_DB = false;

function db_open()
{
    global $_DB;

    $db_hostname = 'localhost';
    $db_database = 'myschool';
    $db_username = 'root';
    $db_password = 'pcni4232!@#';
    $db_portnumber = 3306;
    $db_charset = 'utf8';

    if ($_DB === false) {
        $_DB = @mysqli_connect($db_hostname, $db_username, $db_password, $db_database, $db_portnumber);

        if (mysqli_connect_errno()) {
            printf("<div style='padding: 15px; margin: 10px;
                            border: 1px solid #dca7a7; border-radius: 4px;
                            color: #a94442; background-color: #f2dede;'>
                        <strong>[Error: %d]</strong> %s</div>",
                mysqli_connect_errno(), mysqli_connect_error());
            exit();
        } else {
            @mysqli_set_charset($_DB, $db_charset);
        }
    }
}

function db_close()
{
    global $_DB;

    if ($_DB !== false) {
        @mysqli_close($_DB);
    }
}

function db_query($sql, $params)
{
    global $_DB;

    if (is_array($params)) {
        for ($i = 0; $i < count($params); ++$i) {
            $params[$i] = mysqli_real_escape_string($_DB, $params[$i]);
        }
        $sql = vsprintf($sql, $params);
    }

    $result = @mysqli_query($_DB, $sql);

    if (mysqli_errno($_DB)) {
        printf("<div style='padding: 15px; margin: 10px;
                        border: 1px solid #dca7a7; border-radius: 4px;
                        color: #a94442; background-color: #f2dede;'>
                    <strong>[SQL Error: %d]</strong> %s
                    <blockquote style='padding: 0 0 0 5px; margin: 10px 0 0 5px;
                        border-left: 3px solid #dca7a7'>
                        <i><small>%s</small></i></blockquote></div>",
            mysqli_errno($_DB), mysqli_error($_DB), $sql);

        exit();
    }

    $query_type = substr(strtolower(trim($sql)), 0, 6);

    $value = false;

    switch ($query_type) {
        case 'insert':
            $value = mysqli_insert_id($_DB);
            break;
        case 'delete':
        case 'update':
            $value = mysqli_affected_rows($_DB);
            break;
        case 'select':
            $value = mysqli_fetch_all($result, MYSQLI_ASSOC);
            break;
    }

    return $value;
}
