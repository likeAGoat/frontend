<?PHP
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

    include_once('./inc/helper.php');
    include_once('./inc/db_helper.php');

    $now_page = get('page', 1);
    $total_count = 0;

    $keyword = get('keyword', FALSE);

    db_open();

    $sql = "SELECT COUNT(deptno) AS `cnt` FROM department";
    if ($keyword !== FALSE) {
        $sql.= " WHERE dname LIKE '%%%s%%'";
    }
    $input = array($keyword);
    $result = db_query($sql, $input);

    if ($result !== FALSE) {
        $total_count = $result[0]['cnt'];
    }

    $page_info = get_page_info($total_count, $now_page, 10, 5);

    $sql = "";
    $input = array();

    if ($keyword !== FALSE) {
        $sql.= "SELECT deptno, dname, loc FROM department
                WHERE dname LIKE '%%%s%%'
                ORDER BY deptno DESC";
                //LIMIT %d, %d";

        //$input = array($keyword, $page_info['offset'], $page_info['list_count']);
        $input = array($keyword);
    } else {
        $sql.= "SELECT deptno, dname, loc FROM department
                ORDER BY deptno DESC";
                //LIMIT %d, %d";

        //$input = array($page_info['offset'], $page_info['list_count']);
        $input = array();
    }

    $result = db_query($sql, $input);

    db_close();

    $data = array(
            'keyword' => $keyword,
            'meta' => $page_info,
            'item' => $result
        );

    print_rest_api('OK',  $data);
?>
