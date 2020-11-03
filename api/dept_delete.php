<?PHP
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

    include_once('./inc/helper.php');
    include_once('./inc/db_helper.php');

    $deptno = post('deptno', FALSE);
    // parse_str(file_get_contents('php://input', 'r'), $post_vars);
    // print_r($post_vars);
    // $deptno = isset($post_vars['deptno']) ? $post_vars['deptno'] : null;

    if (!$deptno) {
        print_rest_api('학과번호가 지정되지 않았습니다.', FALSE);
    }

    db_open();

    db_query("DELETE FROM student WHERE deptno=%d", array($deptno));
    db_query("DELETE FROM professor WHERE deptno=%d", array($deptno));

    $sql = "DELETE FROM department WHERE deptno=%d";

    $input = array($deptno);

    $result = db_query($sql, $input);

    if ($result === FALSE) {
        print_rest_api('데이터 삭제에 실패했습니다. 관리자에게 문의하세요.', FALSE);
    }

    if ($result < 1) {
        print_rest_api('삭제된 데이터가 없습니다.', FALSE);
    }

    db_close();

    print_rest_api("OK", FALSE);
?>
